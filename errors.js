exports.handle404Errors = (req, res, next) => {
    return res.status(404).send({ msg: 'Route does not exist' })
}

exports.handle405Errors = (req, res, next) => {
    return res.status(405).send({ msg: 'Method not allowed' })
}

exports.handle400Errors = (err, req, res, next) => {
    if (err.code === "23502") return res.status(400).send({ msg: 'Invalid request, missing data' })
    if (err.code === "42703") return res.status(400).send({ msg: 'Invalid request, unhandled data in article' })
    if (err.code === "22P02") return res.status(400).send({ msg: 'Invalid request, invalid article id' })
    console.log(err)
    return res.status(400).send({ msg: 'Something unexpected went wrong' })
}