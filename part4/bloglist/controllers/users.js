const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        logger.error('User validation failed: username must be unique')
        return response.status(400).json({
            error: 'username must be unique'
        })
    } else if (!password) {
        logger.error('User validation failed: password is required')
        return response.status(400).json({
            error: 'password is required'
        })
    } else if (password.length < 3) {
        logger.error('User validation failed: password is shorter than the minimum allowed length (3)')
        return response.status(400).json({
            error: 'password must be at least 3 characters long'
        })
    }

    saltRounds = 10
    passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = userRouter