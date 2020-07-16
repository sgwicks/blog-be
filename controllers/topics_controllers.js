const { fetchTopics, addTopic, updateTopic, fetchSingleTopic } = require("../models/topics_models")
const { password } = require('../user')
const { handle403Errors, handle404Errors } = require("../errors")
const masterPassword = password

exports.getTopics = (req, res, next) => {
    return fetchTopics()
        .then(topics => res.status(200).send({ topics }))
        .catch(err => next(err))
}

exports.postNewTopic = (req, res, next) => {
    const { topic, password } = req.body
    return password === masterPassword
        ? addTopic(topic)
            .then(([topic]) => res.status(201).send({ topic }))
        : handle403Errors(req, res, next)
}

exports.patchTopic = (req, res, next) => {
    const { topic } = req.params
    const newTopic = req.body.topic
    const { password } = req.body
    return password === masterPassword
        ? updateTopic(topic, newTopic)
            .then(([topic]) => res.status(200).send({ topic }))
        : handle403Errors(req, res, next)
}

exports.getSingleTopic = (req, res, next) => {
    const { topic } = req.params
    return fetchSingleTopic(topic)
        .then(([topic]) => {
            return topic
                ? res.status(200).send({ topic })
                : handle404Errors(req, res, next)
        })

}