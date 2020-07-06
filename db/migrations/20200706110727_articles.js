
exports.up = function(knex) {
  return knex.schema.createTable('articles', articlesTable => {
      articlesTable.increments('article_id');
      articlesTable.string('title').notNullable().unique();
      articlesTable.text('body').notNullable();
      articlesTable.text('blurb');
      articlesTable.string('topic').references('topics.slug')
      articlesTable.timestamp('date').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
