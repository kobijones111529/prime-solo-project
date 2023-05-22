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

// Create a new post
router.post('/', rejectUnauthenticated, async (req, res) => {
  const info = req.body;

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
    info.type,
    info.plantName,
    info.imageUrl,
    info.description,
    info.latitude,
    info.longitude,
    info.contactUrl
  ];

  try {
    const result = await pool.query(query, queryData)
    res.sendStatus(201);
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
    const { rows: posts } = pool.query(getPostsQuery, [req.params.id]);
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
