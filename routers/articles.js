const articlesRouter = require('express').Router()
const { getArticles } = require('../controllers/articles_controllers')

articlesRouter.route('/').get(getArticles)

module.exports = articlesRouter