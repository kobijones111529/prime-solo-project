--
-- Setup
--

CREATE EXTENSION earthdistance CASCADE;

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

--
-- Test Data
--

INSERT INTO "posts"
	("user_id", "type", "plant_name", "description", "image_url", "latitude", "longitude", "contact_url")
VALUES
	(
		1,
		'offer',
		'Red Creeping Thyme',
		E'Great ground cover, forms a nice carpet.\nHas beautiful little red flowers.',
		'https://i.imgur.com/4WdhidD.jpg',
		46.775,
		-92.127,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Bloodroot',
		E'Early spring blooms. Likes full shade.',
		'https://i.imgur.com/0ORoKp0.jpg',
		46.666,
		-92.115,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Jade',
		E'Too many of my jade cuttings rooted, so I\'m getting rid of a few.\nSuper easy to take care of.',
		'https://i.imgur.com/3gvfDRn.jpg',
		46.8,
		-92.103,
		'(218) 324-8963'
	),
	(
		1,
		'request',
		'Bleeding Heart',
		E'Looking for a bleeding heart to add to my garden. White is my favorite, but I\'d be happy with any color!',
		'https://i.imgur.com/RjFDaL1.jpg',
		46.823,
		-92.064,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Forget-Me-Not',
		E'My yard is absolutely covered in these things if anyone wants to take a few. They\'ll grow just about anywhere.',
		'https://i.imgur.com/hYAuxg5.jpg',
		44.99,
		-93.246,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'''Elfin'' Creeping Thyme',
		E'Super tiny leaves, really cute ground cover. Adorable, miniature blue flowers in summer. Likes sun.',
		'https://i.imgur.com/NleIWog.jpg',
		44.993,
		-93.31,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Asiatic Lily',
		E'This funky lil guy can\'t stay here, but I don\'t have a good spot for it. Looking for a new home.',
		'https://i.imgur.com/BMGhMVO.jpg',
		44.951,
		-93.315,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Fern',
		NULL,
		'https://i.imgur.com/vnS7z11.jpg',
		47.025,
		-91.67,
		'(218) 324-8963'
	),
	(
		1,
		'request',
		'Bugleweed',
		E'I\'ve seen this stuff all over my neigborhood, and I\'d love to put a patch under the spruce in my front yard where the grass doesn\'t grow well.',
		'https://i.imgur.com/g4qbM16.jpg',
		46.745,
		-92.233,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Clump Grass',
		E'Nice ornamental grass, I think it looks great bordering flower beds. I\'m digging up a few soon if anyone is interested.',
		'https://i.imgur.com/qA8VgcX.jpg',
		46.843,
		-92.017,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Dwarf Jade',
		E'I\'m moving and don\'t want to take all these little dwarf jades with me. Great beginner bonsai material, tolerates a bit of neglect.',
		'https://i.imgur.com/rEGRrEb.jpg',
		44.96,
		-93.12,
		'(218) 324-8963'
	),
	(
		1,
		'request',
		'Thyme',
		NULL,
		'https://i.imgur.com/g3IUF8L.jpg',
		44.945,
		-93.165,
		'(218) 324-8963'
	),
	(
		1,
		'request',
		'''Black Lace'' Elderberry',
		E'I saw one of these at the garden center, but it was over $60. Anybody have one that I could take a few cuttings from?',
		'https://i.imgur.com/vSyY3CY.jpg',
		46.807,
		-92.104,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Wild Geranium',
		E'Great for heavily shaded wooded areas. Very hardy.',
		'https://i.imgur.com/SRH3z8U.jpg',
		46.85,
		-92.09,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Sedum',
		E'Isn\'t this thing just the cutest? Grows great in dry, sunny locations.',
		'https://i.imgur.com/uPLI9m8.jpg',
		46.76,
		-92.145,
		'(218) 324-8963'
	),
	(
		1,
		'request',
		'Wild Violet',
		E'I\'ve seen some patches of these around town, and I\'d much rather have a native plant like them in my lawn than just grass and dandelions. I\'d just need a few to get started.',
		'https://i.imgur.com/fTBkw2T.jpg',
		46.76,
		-92.141,
		'(218) 324-8963'
	),
	(
		1,
		'offer',
		'Money Tree',
		E'Looking to give away a few of the money tree cuttings I took last year. Nice indoor bonsai (but they like being outdoors in the summer).',
		'https://i.imgur.com/1c8bWAd.jpg',
		46.712,
		-92.122,
		'(218) 324-8963'
	);