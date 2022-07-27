const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(body.title && body.url)) {
    return response.status(400).json({ error: 'blog title and url required' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({...body, user: user._id})

  const postedBlog = await blog.save()

  user.blogs = user.blogs.concat(postedBlog._id)
  await user.save()
  response.status(201).json(postedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(200).end()
})

blogRouter.put('/:id', async (request, response) => {
  const postedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(201).json(postedBlog)
})

module.exports = blogRouter