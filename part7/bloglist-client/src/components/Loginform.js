const Loginform = ({
  username,
  handleNameChange,
  password,
  handlePasswordChange,
  handleLogin,
}) => (
  <form onSubmit={handleLogin} id="login">
    <h2>log in to application</h2>
    <div>
      username
      <input
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={handleNameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        id="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button id="login-button" type="submit">
      Login
    </button>
  </form>
);

export default Loginform;
