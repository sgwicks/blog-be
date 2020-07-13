const app = require('express')()
const port = 8090
const apiRouter = require('./routers/api')
const { json } = require('express')

app.use(json())

app.use('/api', apiRouter)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

module.exports = app