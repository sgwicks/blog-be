const connection = require('../db/connection')

exports.fetchTopics = () => {
    return connection('topics')
}

exports.addTopic = (topic) => {
    return connection('topics')
        .insert(topic)
        .returning('*')
}