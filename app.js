const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const expressValidator = require('express-validator')
const dotenv = require('dotenv');

const { getPosts } = require('./routes/post')

dotenv.config()

//db connection
// Form cluster
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', (error) => {
  console.log(`Error al conectar la DB. ${error}`)
})

const app = express()
const port = process.env.PORT

// Bring in routes
const postRoutes = require('./routes/post')

// Custom middleware
const myOwnMiddleware = (req, res, next) => {
    console.log('MyOwnMiddleware')
    next()
}

// Use Middleware
// Use global
app.use(morgan('dev'))
// app.use(myOwnMiddleware)

// Use express VAlidator
app.use(expressValidator())

// Usar body parser para que parsee JSON formats
app.use(bodyParser.json())

// Se implementa la ruta como un middleware
app.use('/', postRoutes)


// Use per route
// Method: get, route: /, middleware, callback
// app.get('/mymiddleware', myOwnMiddleware, getPosts)

// Method: get, route: /, callback
// app.get('/', getPosts)

// Listen: 2 args, port - callback
app.listen(port, () => {
    console.log(`API listening on ${port}`)
})