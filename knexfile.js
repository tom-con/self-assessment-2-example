require('dotenv').config({ path: '.env.local' });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: 'pg',
	connection: {
		database: process.env.PG_DB,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		port: process.env.PG_PORT,
		host: process.env.PG_HOST,
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
