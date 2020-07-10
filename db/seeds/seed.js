const data = require('../data/test-data')

exports.seed = function (knex) {
  return knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest()
    })
    .then(() => {
      return knex('topics').insert({ topic: 'test', description: 'test blogs' })
    })
    .then(() => {
      return knex('articles').insert(data)
    })
};
