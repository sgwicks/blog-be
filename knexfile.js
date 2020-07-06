const user = require('./user')

const dbConfig = {
  client: 'pg',
  connection :{
    ...user,
    database: 'blog',
  },
  seeds: {
    directory: './db/seeds'
  },
  migrations: {
    directory: './db/migrations'
  }
}

module.exports = dbConfig
