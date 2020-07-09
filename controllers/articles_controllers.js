const { fetchAllArticles } = require('../models/articles_models')

exports.getAllArticles = (req, res) => {
    return fetchAllArticles()
        .then(articles => res.status(200).send(articles))

} 