// No se importa express-validator xq el middleware esta global
// Utiliza el method next xq es un middleware

exports.postValidator = (req, res, next) => {
    // title
    req.check('title', 'Write a title').notEmpty()
    req.check('title', 'The title is betweeen 4 and 150 characters').isLength({
        min: 4,
        max: 150,
    })

    // body
    req.check('body', 'Write a body').notEmpty()
    req.check('body', 'The body is between 4 and 2000 characters').isLength({
        min: 4,
        max: 2000,
    })

    // check for any errors
    // returns an array
    const errors = req.validationErrors()

    // Return only first error
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({
            error: firstError
        })
    }

    // Proceed to next middleware
    next()
}