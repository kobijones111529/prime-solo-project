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

module.exports = router;
