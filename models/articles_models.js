const connection = require('../db/connection')

exports.fetchAllArticles = () => {
    return connection('articles')
        .select('*')
        .then(articles => articles)
}

exports.fetchSingleArticle = () => {
    return 'in the articles by id model'
}