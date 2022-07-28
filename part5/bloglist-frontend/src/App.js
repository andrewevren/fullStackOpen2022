import { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({username,password})

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Invalid username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleNameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  return (
    <div>
    {user === null ?
      <Loginform 
        username={username} handleNameChange={handleNameChange} 
        password={password} handlePasswordChange={handlePasswordChange} 
        handleLogin={handleLogin} /> :
      <Bloglist blogs={blogs} user={user} handleLogout={handleLogout} />}
    </div>
    
  )
}

export default App
