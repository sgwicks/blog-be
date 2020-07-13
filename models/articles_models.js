const connection = require('../db/connection')

exports.fetchAllArticles = () => {
    return connection('articles')
        .select([
            'articles.article_id',
            'articles.title',
            'articles.blurb',
            'articles.topic',
            'articles.date'
        ])
        .then(articles => articles)
}

exports.fetchSingleArticle = (article_id) => {
    return connection('articles')
        .where('article_id', article_id)
        .then(article => article)
}

exports.addNewArticle = (article) => {
    return connection('articles')
        .insert(article)
        .returning('*')
}