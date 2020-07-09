const articlesRouter = require('express').Router()
const { getAllArticles, getArticleById } = require('../controllers/articles_controllers')

articlesRouter.route('/').get(getAllArticles)

articlesRouter.route('/:article_id').get(getArticleById)

module.exports = articlesRouter