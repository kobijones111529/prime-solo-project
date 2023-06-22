import express from "express";
import path from "path";
import dotenv from "dotenv";

import sessionMiddleware from "./modules/session-middleware.js";
import passport from "./strategies/user.strategy.js";

import userRouter from "./routes/user.router.js";
import postsRouter from "./routes/posts.router.js";

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);

// Serve static files
app.use(express.static(path.resolve("client", "build")));

app.get("*", (_req, res) => {
	res.sendFile(path.resolve("client", "build", "index.html"));
});

// App Set //
const PORT = process.env["SERVER_PORT"] || 5000;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});

export default app;
