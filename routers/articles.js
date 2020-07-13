const articlesRouter = require('express').Router()
const { getAllArticles, getArticleById, postNewArticle } = require('../controllers/articles_controllers')

articlesRouter.route('/')
    .get(getAllArticles)
    .post(postNewArticle)

articlesRouter.route('/:article_id').get(getArticleById)

module.exports = articlesRouter