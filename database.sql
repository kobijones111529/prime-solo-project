--
-- Setup
--

CREATE TYPE "post_type" AS ENUM ('offer', 'request');

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" TEXT NOT NULL
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "users" ON DELETE CASCADE,
	"type" "post_type" NOT NULL,
	"plant_name" VARCHAR(127) NOT NULL,
	"image_url" TEXT,
	"description" TEXT,
	"latitude" NUMERIC(8,6) NOT NULL,
	"longitude" NUMERIC(9,6) NOT NULL,
	"contact_url" VARCHAR(255) NOT NULL
);

CREATE TABLE "users_interested_posts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "users",
	"post_id" INT NOT NULL REFERENCES "posts" ON DELETE CASCADE
);