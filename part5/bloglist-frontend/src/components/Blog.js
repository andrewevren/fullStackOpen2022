import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, user, removeBlog}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = event => {
    event.preventDefault()
    setVisible(!visible)
  }

  const incrementLikes = (event) => {
    event.preventDefault()
    const updatedBlog={
      user: blog.user.id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService.update(updatedBlog, blog.id)
    setLikes(likes+1)
  }

  const handleRemove = e => {
    e.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleVisibility}>
        {visible === false ? "view" : "hide"}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={incrementLikes}>like</button></div>
        <div>{blog.author}</div>
        {user.username === blog.user.username ?
          <button onClick={handleRemove}>remove</button> :
          null
        }
      </div>
    </div>  
)}

export default Blog