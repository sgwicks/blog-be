const apiRouter = require('express').Router()
const { getApi } = require('../controllers/api_controllers')
const articlesRouter = require('./articles')
const topicsRouter = require('./topics')
const { handle405Errors } = require('../errors')

apiRouter.route('/')
    .get(getApi)
    .all(handle405Errors)

apiRouter.use('/articles', articlesRouter)
apiRouter.use('/topics', topicsRouter)

module.exports = apiRouter