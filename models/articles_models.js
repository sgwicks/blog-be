const connection = require('../db/connection')

exports.fetchAllArticles = () => {
    return connection('articles')
        .select('*')
        .then(articles => articles)
}