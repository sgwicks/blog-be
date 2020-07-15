const { fetchApi } = require('../models/api_models')

exports.getApi = (req, res, next) => {
    const api = fetchApi()
    res.status(200).send({ api })
}