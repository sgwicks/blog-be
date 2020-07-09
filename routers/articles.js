const articlesRouter = require('express').Router()
const { getAllArticles } = require('../controllers/articles_controllers')

articlesRouter.route('/').get(getAllArticles)

module.exports = articlesRouter