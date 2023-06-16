import pg from "pg";

/**
 * @returns {pg.Pool}
 */
const makePool = () => {
	const databaseUrl = process.env["DATABASE_URL"];

	if (databaseUrl) {
		return new pg.Pool({
			connectionString: databaseUrl,
			ssl: {
				rejectUnauthorized: false,
			},
		});
	} else {
		return new pg.Pool({
			host: "localhost",
			port: 5432,
			database: "solo_project",
		});
	}
};

export default makePool();
