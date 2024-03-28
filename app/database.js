const knex = require('knex')({
	client: 'pg',
	connection: {
		database: process.env.PG_DB,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		port: process.env.PG_PORT,
		host: process.env.PG_HOST,
	}
});

export default knex;