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

describe('initial blogs functioning', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('id property is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('making a post request', () => {
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

    test('likes set to 0 by default', async () => {
        const newPost = {
            title: 'Resources on systems: Toolkits & Practice Guides',
            author: 'Rachel Sinha',
            url: 'http://thesystemstudio.com/new-blog/2018/7/11/resources-on-systems-toolkits-practiceguides'
        }

        const response = await api
            .post('/api/blogs')
            .send(newPost)
        
        expect(response.body.likes).toEqual(0)
    })

    test('cannot post blogs without title and url', async () => {
        const newPost = {
            author: 'Babu Frik',
            likes: 13
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(400)
    })
})

describe('making delete request', () => {
    test('deleting first saved blog', async () => {
        const initialNotes = await helper.blogsInDb()
        
        const noteToDelete = initialNotes[0]

        await api
            .delete(`/api/blogs/${noteToDelete.id}`)
            .expect(200)

        const notesAtEnd = await helper.blogsInDb()

        expect(notesAtEnd).not.toContainEqual(noteToDelete)
    })
    test('catches error with request to nonExistingId', async () => {
        const fakeId = await helper.nonExistingId
        await api
            .delete(`/api/blogs/${fakeId}`)
            .expect(500)
    })
})

describe('updating blogs through put request', () => {
    test('updating likes on first blog', async () => {
        const initialNotes = await helper.blogsInDb()
        
        const noteToPatch = initialNotes[0]
    
        const newNote = {...noteToPatch, likes: 30}

        const response = await api
            .put(`/api/blogs/${noteToPatch.id}`)
            .send(newNote)

        expect(response.body.likes).toEqual(30)
    })
    test('catches error with request to nonExistingId', async () => {
        const fakeId = await helper.nonExistingId
        await api
            .put(`/api/blogs/${fakeId}`)
            .send({title: 'none', author: 'none', url: 'none'})
            .expect(500)
    })
})

afterAll(() => {
    mongoose.connection.close()
})