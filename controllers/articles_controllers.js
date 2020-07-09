const { fetchAllArticles, fetchSingleArticle } = require('../models/articles_models')

exports.getAllArticles = (req, res) => {
    return fetchAllArticles()
        .then(articles => res.status(200).send({ articles }))

}

exports.getArticleById = (req, res) => {
    return res.status(200).send(fetchSingleArticle())
}