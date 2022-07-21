const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title && !blog.url) {
      response.status(400).end()
    } else {
      const postedBlog = await blog.save()
      response.status(201).json(postedBlog)
    }
  })

blogRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne( { id: request.params.id } )
  response.status(200).end()
})

module.exports = blogRouter