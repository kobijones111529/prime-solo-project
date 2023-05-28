const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// Get all posts
router.get('/', async (_, res) => {
  const query = `
    SELECT * FROM "posts";
  `;

  try {
    const result = await pool.query(query);
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
    data.contactUrl
  ];

  try {
    const result = await pool.query(query, queryData)
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.patch('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const postId = Number(req.params.id);

    const getQuery = `
      SELECT
        "user_id" AS "userId"
      FROM "posts"
      WHERE "id" = $1;
    `;

    const { rows: posts } = await pool.query(getQuery, [postId]);
    const post = posts[0];

    if (post === undefined) {
      res.sendStatus(404);
    }

    if (post.userId !== userId) {
      res.sendStatus(403);
    }

    const data = {
      'type': req.body.type,
      'plant_name': req.body.plantName,
      'image_url': req.body.imageUrl,
      'description': req.body.description,
      'contact_url': req.body.contactUrl,
      'longitude': req.body.location?.longitude,
      'latitude': req.body.location?.latitude
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
  const userId = Number(req.user.id);

  const getPostsQuery = `
    SELECT * FROM "posts"
    WHERE "id" = $1;
  `;

  try {
    const { rows: posts } = await pool.query(getPostsQuery, [req.params.id]);
    const post = posts[0];

    // Post not found
    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    // Users don't match
    if (post.user_id !== userId) {
      res.sendStatus(403);
      return;
    }

    const deletePostQuery = `
      DELETE FROM "posts"
      WHERE "id" = $1;
    `;

    await pool.query(deletePostQuery, [post.id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
