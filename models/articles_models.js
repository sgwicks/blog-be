const connection = require('../db/connection')

exports.fetchAllArticles = (query) => {
    let filter = {}
    const { sort_by, order, topic } = query
    if (topic) filter = { ...filter, topic }
    return connection('articles')
        .select([
            'articles.article_id',
            'articles.title',
            'articles.blurb',
            'articles.topic',
            'articles.date'
        ])
        .where(filter)
        .orderBy(sort_by || 'date', order || 'asc')
        .then(articles => articles)
}

exports.fetchSingleArticle = (article_id) => {
    return connection('articles')
        .where({ article_id })
        .then(article => article)
}

exports.addNewArticle = (article) => {
    return connection('articles')
        .insert(article)
        .returning('*')
}

exports.updateArticle = (article_id, article) => {
    return connection('articles')
        .where({ article_id })
        .update(article)
        .returning('*')
}