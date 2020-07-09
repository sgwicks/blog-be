const apiRouter = require('express').Router()
const { getApi } = require('../controllers/api_controllers')
const articlesRouter = require('./articles')

apiRouter.route('/').get(getApi)

apiRouter.use('/articles', articlesRouter)

module.exports = apiRouter