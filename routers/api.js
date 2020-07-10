const apiRouter = require('express').Router()
const { getApi } = require('../controllers/api_controllers')
const articlesRouter = require('./articles')
const topicsRouter = require('./topics')

apiRouter.route('/').get(getApi)

apiRouter.use('/articles', articlesRouter)
apiRouter.use('/topics', topicsRouter)

module.exports = apiRouter