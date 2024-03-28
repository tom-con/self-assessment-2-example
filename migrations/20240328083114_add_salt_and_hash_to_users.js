/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable('users', (table) => {
		table.string('salt', 32);
		table.string('hash', 128);
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable('users', (table) => {
		table.dropColumn('hash')
		table.dropColumn('salt')
	})
};
