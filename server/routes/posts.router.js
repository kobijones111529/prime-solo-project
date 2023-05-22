const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// Get all posts
router.get('/', (_, res) => {
  const query = `
    SELECT * FROM "posts";
  `;
  pool
    .query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Create a new post
router.post('/', rejectUnauthenticated, (req, res) => {
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

  pool
    .query(query, queryData) // Execute query
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const postId = Number(req.params.id);
  const userId = Number(req.user.id);

  const getPostsQuery = `
    SELECT * FROM "posts"
    WHERE "id" = $1;
  `;
  pool
    .query(getPostsQuery, [postId]) // Select post
    .then(result => result.rows[0])
    .then(post => {
      if (post === undefined) {
        res.sendStatus(404);
        return;
      }

      if (post === undefined || post.user_id !== userId) {
        res.sendStatus(403);
        return;
      }

      const deletePostQuery = `
        DELETE FROM "posts"
        WHERE "id" = $1;
      `;
      pool
        .query(deletePostQuery, [postId])
        .then(() => {
          res.sendStatus(200);
        })
        .catch(err => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
