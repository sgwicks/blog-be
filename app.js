const app = require('express')()
const port = 8080
const apiRouter = require('./routers/api')

app.use('/api', apiRouter)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

module.exports = app