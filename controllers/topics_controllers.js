const { fetchTopics } = require("../models/topics_models")

exports.getTopics = (req, res) => {
    return fetchTopics()
        .then(topics => res.status(200).send({ topics }))
}