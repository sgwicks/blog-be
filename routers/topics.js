const topicsRouter = require('express').Router()
const { getTopics } = require('../controllers/topics_controllers')
const { handle405Errors } = require('../errors')

topicsRouter.route('/')
    .get(getTopics)
    .all(handle405Errors)

module.exports = topicsRouter