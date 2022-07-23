const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

describe('making user post requests', () => {
    beforeEach( async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const newUser = new User({username: "andyEvery", name: "Andy", passwordHash: passwordHash})

        await newUser.save()
    })

    test('valid user posts successfully', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'babufrik',
            name: 'Babu',
            password: 'droidIsReady'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('posting user without username throws error', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Jabba',
            password: 'notTheDroids'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('posting user with invalid username throws error', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ja',
            name: 'Jabba',
            password: 'notTheDroids'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('posting user without password throws error', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'jabbathehut',
            name: 'Jabba'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('posting user with invalid password throws error', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'jabbathehut',
            name: 'Jabba',
            password: 'no'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('posting user with duplicate username throws error', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'andyEvery',
            name: 'Every',
            password: 'capricorn'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})