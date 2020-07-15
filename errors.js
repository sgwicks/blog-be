exports.handle404Errors = (req, res, next) => {
    return res.status(404).send({ msg: 'Route does not exist' })
}