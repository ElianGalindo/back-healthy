const express  = require('express')
//const cors = require('cors')
const routes = require('./routes/routes')

//Declarar variable para servidor
const app = express()

//Middleware
//app.use(cors())
app.use(express.json())
app.use('/', routes)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
    console.log(`Listen Port: ${PORT}`)
})