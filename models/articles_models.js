const connection = require('../db/connection')
const articlesRouter = require('../routers/articles')

exports.fetchAllArticles = () => {
    return connection('articles')
        .select('*')
        .then(articles => articles)
}

exports.fetchSingleArticle = (article_id) => {
    return connection('articles')
        .select('*')
        .where('article_id', article_id)
        .then(article => article)
}