import express from "express";
import pool from "../../modules/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
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

export default router;
