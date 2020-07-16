const articlesRouter = require('express').Router()
const { getAllArticles, getArticleById, postNewArticle, patchArticle } = require('../controllers/articles_controllers')
const { handle405Errors } = require('../errors')

articlesRouter.route('/')
    .get(getAllArticles)
    .post(postNewArticle)
    .all(handle405Errors)

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(patchArticle)
    .all(handle405Errors)

module.exports = articlesRouter