const config = require('../knexfile.js')
const knex = require('knex')(config)

// criar as tabelas
//knex.migrate.latest([config])
module.exports = knex