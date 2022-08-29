const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Leverage Points: Places to Intervene in a System',
        author: 'Donella Meadows',
        url: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
        likes: 10
    },
    {
        title: 'A gentle introduction to dynamical systems theory',
        author: 'Fabian Dablander',
        url: 'https://www.r-bloggers.com/2020/12/a-gentle-introduction-to-dynamical-systems-theory/',
        likes: 3
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'none',
        author: 'none',
        url: 'none',    
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getTesterToken = async api => {
    const login = await api.post('/api/login').send({username:'testtester',password:'password'})
    return login.body.token
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    getTesterToken
}