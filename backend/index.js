// mongodb://localhost:27017
var cors = require('cors')
const connectToMongo = require('./db');
const express = require('express')
const app = express()

app.use(cors())
//middler ware
 app.use(express.json())

connectToMongo()



const port = 5000

//available routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})