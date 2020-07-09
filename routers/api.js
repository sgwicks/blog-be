const apiRouter = require('express').Router()
const { getApi } = require('../controllers/api_controllers')

apiRouter.route('/').get(getApi)

module.exports = apiRouter