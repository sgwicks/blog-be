const { fetchAllArticles, fetchSingleArticle, addNewArticle } = require('../models/articles_models')

exports.getAllArticles = (req, res) => {
    return fetchAllArticles()
        .then(articles => res.status(200).send({ articles }))

}

exports.getArticleById = (req, res) => {
    const { article_id } = req.params
    return fetchSingleArticle(article_id)
        .then(([article]) => res.status(200).send({ article }))
}

exports.postNewArticle = (req, res) => {
    const article = req.body
    return addNewArticle(article)
        .then(([article]) => res.status(201).send({ article }))
}