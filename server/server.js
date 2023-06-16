const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const postsRouter = require("./routes/posts.router");

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
