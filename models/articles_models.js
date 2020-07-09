const connection = require('../db/connection')

exports.fetchAllArticles = () => {
    return connection('articles')
        .select()
        .then(articles => articles)
}

exports.fetchSingleArticle = (article_id) => {
    return connection('articles')
        .where('article_id', article_id)
        .then(article => article)
}