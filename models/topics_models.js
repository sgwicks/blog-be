const connection = require('../db/connection')

exports.fetchTopics = () => {
    return connection('topics')
}

exports.addTopic = (topic) => {
    return connection('topics')
        .insert(topic)
        .returning('*')
}

exports.updateTopic = (topic, newTopic) => {
    return connection('topics')
        .where({ topic })
        .update(newTopic)
        .returning('*')
}