import { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({username,password})

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Invalid username or password')
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleNameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const submitPost = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({title,author,url})
    console.log(newBlog)
    setNotification(`new blog posted ${title} by ${author}`)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(() => {
      setNotification(null)
    },5000)
    setBlogs(blogs.concat(newBlog))
  }

  return (
    <div>
      <Notification message={notification}/>
      {user === null ?
        <Loginform 
          username={username} handleNameChange={handleNameChange} 
          password={password} handlePasswordChange={handlePasswordChange} 
          handleLogin={handleLogin} /> :
        <Bloglist 
          blogs={blogs} 
          user={user} 
          handleLogout={handleLogout} 
          setNotification={setNotification}
          title={title} setTitle={setTitle}
          author={author} setAuthor={setAuthor}
          url={url} setUrl={setUrl}
          submitPost={submitPost}
          />}
    </div>
  )
}

export default App
