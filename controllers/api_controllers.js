const { fetchApi } = require('../models/api_models')

exports.getApi = (req, res) => res.send(fetchApi())