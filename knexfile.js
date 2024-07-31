// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      port: '3306',
      password : 'root1234',
      database : 'personal_trainer_db',
    },
    migrations: {
      directory:'/knex/migrations',
    },
    seeds: {
      directory:'/knex/seeds'
    }
  }
};
