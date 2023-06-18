import express from "express";
import pool from "../modules/pool.js";
import { rejectUnauthenticated } from "../modules/authentication-middleware.js";
import { z } from "zod";

const router = express.Router();

/**
 * @typedef {import("../../types/posts").Post} Post
 * @typedef {import('../../types/posts').NewPost} NewPost
 * @typedef {import('../../types/posts').EditPost} EditPost
 */

/**
 * @typedef {import('../../types/filters').Query} FiltersQuery
 */

// Get all posts
router.get(
	"/",
	/**
	 * @typedef {Post[]} ResponseBody
	 * @typedef {FiltersQuery} RequestQuery
	 * @param {import("express").Request<{}, ResponseBody>} req
	 * @param {import("express").Response<ResponseBody>} res
	 */
	async (req, res) => {
		// Using optional never properties to represent a
		// union with an empty object, but which can be
		// narrowed (a union with an empty object cannot)
		const queryValidator = z
			.object({
				latitude: z.preprocess(Number, z.number().gte(-90).lte(90)),
				longitude: z.preprocess(Number, z.number().gte(-180).lte(180)),
				distance: z.preprocess(Number, z.number().gt(0)).optional(),
			})
			.or(
				z.object({
					latitude: z.never().optional(),
					longitude: z.never().optional(),
				})
			);

		const parsedQuery = queryValidator.safeParse(req.query);
		if (!parsedQuery.success) {
			res.sendStatus(400);
			return;
		}
		const query = parsedQuery.data;

		const locationFilter = query.latitude
			? {
					latitude: query.latitude,
					longitude: query.longitude,
					...(query.distance && { distance: query.distance }),
			  }
			: undefined;

		const filters = {
			...(locationFilter && { location: locationFilter }),
		};

		const selectQuery = `
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
				ORDER BY
					CASE WHEN
						$1::DOUBLE PRECISION IS NOT NULL AND
						$2::DOUBLE PRECISION IS NOT NULL
					THEN POINT("longitude", "latitude") <@> POINT($2, $1)
					END
			`;

		try {
			const { rows: posts } = await pool.query(selectQuery, [
				filters.location?.latitude || null,
				filters.location?.longitude || null,
			]);
			const parsedPosts = z
				.array(
					z.object({
						id: z.number(),
						user_id: z.number(),
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

router.get(
	"/:id",
	/**
	 * @param {import("express").Request<{"id": string}, {}, {}>} req
	 * @param {import("express").Response<{}>} res
	 */
	async (req, res) => {
		const id = Number(req.params["id"]) || undefined;
		if (id === undefined) {
			res.sendStatus(404);
			return;
		}

		const query = `
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
			WHERE "id" = $1
		`;

		try {
			const { rows: posts } = await pool.query(query, [id]);
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
			const post = parsedPosts[0] || undefined;

			if (post === undefined) {
				res.sendStatus(404);
			} else {
				res.send(post);
			}
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	}
);

// Create a new post
router.post("/", rejectUnauthenticated, async (req, res) => {
	if (!req.user) {
		res.sendStatus(500);
		return;
	}

	const bodyValidator = z.object({
		type: z.enum(["offer", "request"]),
		plantName: z.string(),
		imageUrl: z.string().url().nullable(),
		description: z.string().nullable(),
		location: z.object({
			latitude: z.number().gte(-90).lte(90),
			longitude: z.number().gte(-180).lte(180),
		}),
		contact: z.string(),
	});

	const parsedBody = bodyValidator.safeParse(req.body);
	if (!parsedBody.success) {
		res.sendStatus(400);
		return;
	}

	/** @type {NewPost} */
	const body = parsedBody.data;

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
		body.type,
		body.plantName,
		body.imageUrl,
		body.description,
		body.location.latitude,
		body.location.longitude,
		body.contact,
	];

	try {
		await pool.query(query, queryData);
		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.patch(
	"/:id",
	rejectUnauthenticated,
	/**
	 * @param {import("express").Request<{ "id": string }, {}>} req
	 * @param {import("express").Response<{}>} res
	 */
	async (req, res) => {
		const bodyValidator = z.object({
			type: z.enum(["offer", "request"]).optional(),
			plantName: z.string().nonempty().optional(),
			imageUrl: z.string().nonempty().nullable().optional(),
			description: z.string().nonempty().nullable().optional(),
			location: z
				.object({
					latitude: z.number().gte(-90).lte(90),
					longitude: z.number().gte(-180).lte(180),
				})
				.optional(),
			contact: z.string().optional(),
		});

		if (!req.user) {
			res.sendStatus(500);
			return;
		}

		const postId = Number(req.params["id"]) || undefined;
		// "id" param is invalid
		if (!postId || !Number.isInteger(postId)) {
			res.sendStatus(404);
			return;
		}

		try {
			const { rows: posts } = await pool.query(
				`
					SELECT
						"user_id" AS "userId"
					FROM "posts"
					WHERE "id" = $1;
				`,
				[postId]
			);
			const parsedPosts = z
				.array(
					z.object({
						userId: z.number().int(),
					})
				)
				.parse(posts);
			const post = parsedPosts[0] || undefined;

			if (post === undefined) {
				res.sendStatus(404);
				return;
			}

			if (post.userId !== req.user.id) {
				res.sendStatus(403);
				return;
			}

			const parsedBody = bodyValidator.safeParse(req.body);
			if (!parsedBody.success) {
				res.sendStatus(400);
				return;
			}
			const body = parsedBody.data;

			const updates = Object.entries({
				type: body.type,
				plant_name: body.plantName,
				image_url: body.imageUrl,
				description: body.description,
				contact_url: body.contact,
				longitude: body.location?.longitude,
				latitude: body.location?.latitude,
			}).filter(([_, value]) => value !== undefined);

			if (updates.length < 1) {
				res.sendStatus(200);
				return;
			}

			const staticSqlParams = [postId];
			const dynamicSqlParams = updates.map(([_, value]) => value);
			const sqlUpdates = updates
				.map(
					([key, _], index) => `${key} = $${index + dynamicSqlParams.length}`
				)
				.join(", ");
			const sqlParams = [...staticSqlParams, ...dynamicSqlParams];

			const editQuery = `
			UPDATE "posts"
			SET ${sqlUpdates}
			WHERE "id" = $1;
		`;
			await pool.query(editQuery, sqlParams);

			res.sendStatus(200);
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	}
);

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
	if (!req.user) {
		res.sendStatus(500);
		return;
	}

	const postId = Number(req.params.id);

	try {
		const { rows: posts } = await pool.query(
			`
				SELECT
					"user_id" AS "userId"
				FROM "posts"
				WHERE "id" = $1;
			`,
			[req.params.id]
		);
		const parsedPosts = z
			.array(
				z.object({
					userId: z.number().int(),
				})
			)
			.parse(posts);
		const post = parsedPosts[0] || undefined;

		// Post not found
		if (post === undefined) {
			res.sendStatus(404);
			return;
		}

		// Users don't match
		if (post.userId !== req.user.id) {
			res.sendStatus(403);
			return;
		}

		await pool.query(
			`
				DELETE FROM "posts"
				WHERE "id" = $1;
			`,
			[postId]
		);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

export default router;
