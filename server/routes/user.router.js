import express from "express";
import { rejectUnauthenticated } from "../modules/authentication-middleware.js";
import { encryptPassword } from "../modules/encryption.js";
import pool from "../modules/pool.js";
import userStrategy from "../strategies/user.strategy.js";
import postsRouter from "./user/posts.router.js";

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
	// Send back user object from the session (previously queried from the database)
	res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res) => {
	const username = req.body.username;
	const password = encryptPassword(req.body.password);

	const queryText = `
		INSERT INTO "users" (username, password)
		VALUES ($1, $2) RETURNING id
	`;
	pool
		.query(queryText, [username, password])
		.then(() => res.sendStatus(201))
		.catch((err) => {
			console.log("User registration failed: ", err);
			res.sendStatus(500);
		});
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
	res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
	// Use passport's built-in method to log out the user
	req.logout(() => {});
	res.sendStatus(200);
});

router.use("/posts", postsRouter);

export default router;
