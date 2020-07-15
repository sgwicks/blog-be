const { fetchAllArticles, fetchSingleArticle, addNewArticle } = require('../models/articles_models')
const user = require('../user')
const masterPassword = user.password

exports.getAllArticles = (req, res, next) => {
    return fetchAllArticles()
        .then(articles => res.status(200).send({ articles }))
        .catch(err => next(err))

}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    return fetchSingleArticle(article_id)
        .then(([article]) => res.status(200).send({ article }))
        .catch(err => next(err))
}

exports.postNewArticle = (req, res, next) => {
    const { article, password } = req.body
    return password === masterPassword
        ? addNewArticle(article)
            .then(([article]) => res.status(201).send({ article }))
            .catch(err => next(err))
        : res.status(403).send({ msg: 'Request denied, incorrect password' })
}