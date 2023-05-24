const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');

const router = express.Router();

router.get('/', async (req, res) => {
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
