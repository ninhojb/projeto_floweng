/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('modulo', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.timestamp('created_at').defaultTo(knex.fn.now(10))
        table.timestamp('update_at')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('modulo')
  
};
