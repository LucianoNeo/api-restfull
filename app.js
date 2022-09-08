const express = require('express')

const morgan = require('morgan')

const app = express()

const bodyParser = require('body-parser')

const usersRoute = require('./routes/users')


app.use(morgan('dev')) // show the request log

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).send({})
    }
    next()
})

app.use('/users', usersRoute)


app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app










