const express = require('express');
const { Pool } = require('pg');
/** @type {Pool} */
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  const query = `
    SELECT * FROM "posts"
    WHERE "user_id" = $1;
  `;

  try {
    const { rows: posts } = await pool.query(query, [req.user.id]);
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
