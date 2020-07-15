exports.handle404Errors = (req, res, next) => {
    return res.status(404).send({ msg: 'Route does not exist' })
}

exports.handle405Errors = (req, res, next) => {
    return res.status(405).send({ msg: 'Method not allowed' })
}

exports.handle400Errors = (err, req, res, next) => {

}