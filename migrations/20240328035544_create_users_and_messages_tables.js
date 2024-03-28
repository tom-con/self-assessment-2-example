/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('name', 64).notNullable();
		table.string('email', 128).notNullable();
		table.timestamps(true, true);
	}).createTable('messages', (table) => {
		table.increments('id').primary();
		table.integer('sender_id').unsigned().notNullable().references('users.id');
		table.integer('receiver_id').unsigned().notNullable().references('users.id');
		table.string('content', 2048).notNullable();
		table.timestamps(true, true);
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('messages').dropTable('users');
};
