const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach( async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id property is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('create new blog post', async () => {
    const newPost = {
        title: 'Factors forming the original Society for General Systems Research (SGSR)',
        author: 'Peter Tuddenham',
        url: 'https://www.isss.org/blog/?view=blog&id=31',
        likes: 23
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Factors forming the original Society for General Systems Research (SGSR)')
})

afterAll(() => {
    mongoose.connection.close()
})