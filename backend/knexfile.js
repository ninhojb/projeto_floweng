// Update with your config setting
//conexao com o banco de dados

module.exports = {
    client: 'postgresql',
    connection: {
        database: 'knowledge',
        user: 'postgres',
        password: 'Mastermind@10'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};