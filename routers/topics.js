const topicsRouter = require('express').Router()
const { getTopics, postNewTopic, patchTopic } = require('../controllers/topics_controllers')
const { handle405Errors } = require('../errors')

topicsRouter.route('/')
    .get(getTopics)
    .post(postNewTopic)
    .all(handle405Errors)

topicsRouter.route('/:topic')
    .patch(patchTopic)

module.exports = topicsRouter