const topicsRouter = require('express').Router()
const { getTopics, postNewTopic } = require('../controllers/topics_controllers')
const { handle405Errors } = require('../errors')

topicsRouter.route('/')
    .get(getTopics)
    .post(postNewTopic)
    .all(handle405Errors)

module.exports = topicsRouter