const Post = require('../models/post')

exports.getPosts = (req, res) => {
    // res.send('Hello form post controller')
    Post.find()  // buscar en la db
    .select('_id title body')   // seleccionar los campos a traer
    .then((posts) => {
        res.json({ posts }) // Retorna un array
    })
    .catch((err) => console.log(err))

}

exports.createPost = (req, res) => {
    // 1.- INSTANCIAMOS
    const post = new Post(req.body)
    // console.log('CREATING POST', req.body)

    // Aqui checks si hay errores
    // Ya no lo utilizamos, validator checks for errors
    // post.save((error, result) => {
    //     if (error) {
    //         res.status(400).json({
    //             error,
    //         })
    //     }

    //     res.status(200).json({
    //         post: result
    //     })
    // })

    // 2.- GUARDAMOS
    post.save().then((result) => {
        res.status(200).json({
            post: result
        })
    })
}