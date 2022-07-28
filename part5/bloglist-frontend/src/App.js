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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({username,password})
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Invalid username or password')
    }
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
      <Bloglist blogs={blogs} user={user} />}
    </div>
    
  )
}

export default App
