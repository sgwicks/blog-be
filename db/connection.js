const ENV = process.env.NODE_ENV
const connection = require('knex')

const dbConfig = require('../knexfile')

module.exports = connection(dbConfig)