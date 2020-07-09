const { fetchAllArticles, fetchSingleArticle } = require('../models/articles_models')

exports.getAllArticles = (req, res) => {
    return fetchAllArticles()
        .then(articles => res.status(200).send({ articles }))

}

exports.getArticleById = (req, res) => {
    const { article_id } = req.params
    return fetchSingleArticle(article_id)
        .then(article => res.status(200).send({ article }))
}
