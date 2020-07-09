const { fetchAllArticles } = require('../models/articles_models')

exports.getAllArticles = (req, res) => res.status(200).send(fetchAllArticles())