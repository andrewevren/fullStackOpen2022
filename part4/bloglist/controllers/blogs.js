const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if (!(body.title && body.url)) {
    return response.status(400).json({ error: 'blog title and url required' })
  }

  const user = request.user

  const blog = new Blog({...body, user: user._id})

  const postedBlog = await blog.save()

  user.blogs = user.blogs.concat(postedBlog._id)
  await user.save()
  response.status(201).json(postedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!( blog.user.toString() === user.id.toString() )){
    return response.status(400).json({ error: 'blogs can only be removed by their creator' })
  }

  await blog.remove()
  response.status(200).end()
})

blogRouter.put('/:id', async (request, response) => {
  const postedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(201).json(postedBlog)
})

module.exports = blogRouter