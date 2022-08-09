const Loginform = ({ username, handleNameChange, password, handlePasswordChange, handleLogin }) => (
  <form onSubmit={handleLogin} id='login'>
    <h2>log in to application</h2>
    <div>
        username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleNameChange}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default Loginform