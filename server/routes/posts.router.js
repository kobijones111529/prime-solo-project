const express = require('express');
const { Pool } = require('pg');
/** @type {Pool} */
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * @typedef {import('../../types/posts').NewPost} NewPost
 * @typedef {import('../../types/posts').EditPost} EditPost
 */

/**
 * @typedef {import('../../types/filters').Filters} Filters
 * @typedef {import('../../types/filters').LocationFilter} LocationFilter
 * @typedef {import('../../types/filters').Query} FiltersQuery
 */

// Get all posts
router.get('/', async (req, res) => {
  /** @type {FiltersQuery} */
  const filtersQuery = req.query;

  /**
   * @param {FiltersQuery} query
   * @returns {LocationFilter | undefined}
   */
  const getLocationFilter = query => {
    if (!filtersQuery.latitude || !filtersQuery.longitude) {
      return undefined;
    }

    return {
      center: [filtersQuery.latitude, filtersQuery.longitude],
      ...(filtersQuery.distance && { distance: filtersQuery.distance })
    };
  }

  const locationFilter = getLocationFilter(filtersQuery);

  /** @type {Filters} */
  const filters = {
    ...(locationFilter && { location: locationFilter })
  };

  const idGen = (function*() {
    for (let i = 1; ; i++) {
      yield i;
    }
  })();

  const query = filters.location
    ?
      `
        SELECT * FROM "posts"
        ORDER BY
          ABS(("latitude" - $1) + ("longitude" - $2));
      `
    :
      `
        SELECT * FROM "posts";
      `;

  try {
    const result = await pool.query(query, filters.location ? [...filters.location.center] : undefined);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id) || undefined;
  if (id === undefined) {
    res.sendStatus(404);
    return;
  }

  const query = `
    SELECT * FROM "posts"
    WHERE "id" = $1;
  `;

  try {
    const { rows: posts } = await pool.query(query, [id]);
    const post = posts[0];

    if (post === undefined) {
      res.sendStatus(404);
    } else {
      res.send(post);
    }
  } catch (err)  {
    console.error(err);
    res.sendStatus(500);
  }
});

// Create a new post
router.post('/', rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  /** @type {NewPost} */
  const data = req.body;

  const query = `
    INSERT INTO "posts" (
      "user_id",
      "type",
      "plant_name",
      "image_url",
      "description",
      "latitude",
      "longitude",
      "contact_url"
    ) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8);
  `;
  const queryData = [
    req.user.id,
    data.type,
    data.plantName,
    data.imageUrl,
    data.description,
    data.location.latitude,
    data.location.longitude,
    data.contact
  ];

  try {
    await pool.query(query, queryData)
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.patch('/:id', rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  try {
    const userId = Number(req.user.id);
    const postId = Number(req.params.id);

    const getQuery = `
      SELECT
        "user_id" AS "userId"
      FROM "posts"
      WHERE "id" = $1;
    `;

    /**
     * @type {{ rows: { userId: number }[] }}
     */
    const { rows: posts } = await pool.query(getQuery, [postId]);
    const post = posts[0];

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    if (post.userId !== userId) {
      res.sendStatus(403);
      return;
    }

    /** @type {EditPost} */
    const body = req.body;

    const data = {
      'type': body.type,
      'plant_name': body.plantName,
      'image_url': body.imageUrl,
      'description': body.description,
      'contact_url': body.contact,
      'longitude': body.location?.longitude,
      'latitude': body.location?.latitude
    }
    const entries = Object.entries(data).filter(([_, value]) => value !== undefined);

    if (entries.length < 1) {
      res.sendStatus(200);
      return;
    }

    const offset = 1;
    const updates = entries
      .map(([key, _], index) => `${key} = $${index + 1 + offset}`)
      .join(', ');
    const sqlParams = [postId, ...entries.map(([_, value]) => value)]

    const editQuery = `
      UPDATE "posts"
      SET ${updates}
      WHERE "id" = $1;
    `;
    await pool.query(editQuery, sqlParams);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  const userId = Number(req.user.id);
  const postId = Number(req.params.id);

  const getPostsQuery = `
    SELECT
      "user_id" AS "userId"
    FROM "posts"
    WHERE "id" = $1;
  `;

  try {
    /** @type {{ rows: { userId: number }[] }} */
    const { rows: posts } = await pool.query(getPostsQuery, [req.params.id]);
    const post = posts[0];

    // Post not found
    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    // Users don't match
    if (post.userId !== userId) {
      res.sendStatus(403);
      return;
    }

    const deletePostQuery = `
      DELETE FROM "posts"
      WHERE "id" = $1;
    `;

    await pool.query(deletePostQuery, [postId]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
