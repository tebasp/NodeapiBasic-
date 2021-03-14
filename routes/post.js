const express = require('express')
const postController = require('../controllers/post')
const validator = require('../validators/post')

// Se instancia el router de express
const router = express.Router()

// Se agregan las rutas
// metodo, route, middleware, callback
router.get('/', postController.getPosts)
router.post('/post', validator.postValidator ,postController.createPost)

// No se exporta como objeto
module.exports = router

