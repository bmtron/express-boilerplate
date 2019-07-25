const UsersService = require('./users_service')
const express = require('express')
const path = require('path')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter.route('/')
.get((req, res, next) => {
    UsersService.getAllUsers(req.app.get('db'))
    .then(users => {
        res.json(users)
    }).catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { user_name, full_name, password} = req.body
    const newUser = {user_name, full_name, password}

    for (const [key, value] of Object.entries(newUser)) {
        if (value == null) {
            res.status(400).json({
                error: {
                    message: `Missing ${key} in request body`
                }
            })
        }
    }
    UsersService.addNewUser(req.app.get('db'), newUser)
    .then(user => {
        res
        .status(201)
        .location(path.posix.originalUrl, `/${user.id}`)
        .json({
            id: user.id,
            user_name: user.user_name,
            full_name: user.full_name,
            password: user.password
        })
    }).catch(next)
})
usersRouter.route('/:user_id')
.all((req, res, next) => {
    UsersService.getUserById(req.app.get('db'), req.params.user_id)
    .then(user => {
        if(!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found'
                }
            })
        }
        res.user = user
        next()
    })
    .catch(next)
})
.get((req, res, next) => {
    res.json(res.user)
})
.delete((req, res, next) => {
    UsersService.deleteUser(req.app.get('db'), req.params.user_id)
    .then(() => {
        res.status(204).end()
    })
    .catch(next)
})
module.exports = usersRouter