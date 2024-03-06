/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('support', table => {
        table.increments('id').primary()
        table.date('created_at').defaultTo(knex.fn.now(6))
        table.string('service').notNull()
        table.string('description', 1000).notNull()
        table.string('priority').notNull()
        table.string('action', 1000)
        table.string('status')
        table.date('expected_date')
        table.date('update_at')
        table.date('completion_date')
        table.integer('id_user').references('id')
            .inTable('users')
        table.integer('id_depart').references('id')
            .inTable('department')


    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('support')
  
};
