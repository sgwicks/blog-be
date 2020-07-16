const topicsRouter = require('express').Router()
const { getTopics, postNewTopic, patchTopic, getSingleTopic } = require('../controllers/topics_controllers')
const { handle405Errors } = require('../errors')

topicsRouter.route('/')
    .get(getTopics)
    .post(postNewTopic)
    .all(handle405Errors)

topicsRouter.route('/:topic')
    .get(getSingleTopic)
    .patch(patchTopic)
    .all(handle405Errors)

module.exports = topicsRouter