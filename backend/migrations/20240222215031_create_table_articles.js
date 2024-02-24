/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('descriotion', 1000).notNull()
        table.string('imagUrl', 1000)
        table.binary('content').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('categoryId').references('id')
            .inTable('categories').notNull()

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
  
};
