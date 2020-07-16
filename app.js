const app = require('express')()
const port = 8090
const apiRouter = require('./routers/api')
const { json } = require('express')
const { handle404Errors, handle400Errors } = require('./errors')

app.use(json())

app.use('/api', apiRouter)

app.all('/*', handle404Errors)

app.use(handle400Errors)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

module.exports = app