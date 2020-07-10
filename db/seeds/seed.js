const {
  topicData,
  articleData
} = require('../data/index.js')

exports.seed = function (knex) {
  return knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest()
    })
    .then(() => {
      return knex('topics').insert(topicData)
    })
    .then(() => {
      return knex('articles').insert(articleData)
    })
};
