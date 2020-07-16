const { fetchAllArticles, fetchSingleArticle, addNewArticle } = require('../models/articles_models')
const user = require('../user')
const { handle404Errors, handle403Errors } = require('../errors')
const masterPassword = user.password

exports.getAllArticles = (req, res, next) => {
    const { query } = req
    return fetchAllArticles(query)
        .then(articles => res.status(200).send({ articles }))
        .catch(err => next(err))

}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    return fetchSingleArticle(article_id)
        .then(([article]) => {
            return article
                ? res.status(200).send({ article })
                : handle404Errors(req, res, next)
        })
        .catch(err => next(err))
}

exports.postNewArticle = (req, res, next) => {
    const { article, password } = req.body
    if (!article) return res.status(400).send({ msg: 'Invalid request, article key is missing' })
    return password === masterPassword
        ? addNewArticle(article)
            .then(([article]) => res.status(201).send({ article }))
            .catch(err => next(err))
        : handle403Errors(req, res, next)
}