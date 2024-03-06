/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('department', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.date('created_at').defaultTo(knex.fn.now(6))
        table.date('update_at')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('department')
  
};
