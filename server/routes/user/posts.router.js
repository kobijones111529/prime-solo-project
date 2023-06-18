import express from "express";
import { z } from "zod";
import pool from "../../modules/pool.js";

const router = express.Router();

router.get(
	"/",
	/**
	 * @typedef Post
	 * @property {number} id
	 * @property {number} user_id
	 * @property {"offer" | "request"} type
	 * @property {string} plant_name
	 * @property {string | null} image_url
	 * @property {string | null} description
	 * @property {number} latitude
	 * @property {number} longitude
	 * @property {string} contact_url
	 * @typedef {Post[]} ResponseBody
	 * @param {import("express").Request<{}, ResponseBody, {}>} req
	 * @param {import("express").Response<ResponseBody>} res
	 */
	async (req, res) => {
		if (!req.user) {
			res.sendStatus(500);
			return;
		}

		try {
			const { rows: posts } = await pool.query(
				`
					SELECT
						"id",
						"user_id" AS "user_id",
						"type",
						"plant_name" AS "plant_name",
						"image_url" AS "image_url",
						"description",
						"latitude"::DOUBLE PRECISION,
						"longitude"::DOUBLE PRECISION,
						"contact_url" AS "contact_url"
					FROM "posts"
					WHERE "user_id" = $1;
				`,
				[req.user.id]
			);
			const parsedPosts = z
				.array(
					z.object({
						id: z.number().int(),
						user_id: z.number().int(),
						type: z.enum(["offer", "request"]),
						plant_name: z.string(),
						image_url: z.string().nullable(),
						description: z.string().nullable(),
						latitude: z.number(),
						longitude: z.number(),
						contact_url: z.string(),
					})
				)
				.parse(posts);
			res.send(parsedPosts);
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	}
);

export default router;
