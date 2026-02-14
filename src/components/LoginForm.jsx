export default function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  error,
  goToRegister
}) {
  return (
    <div className="quiz-container">
      <h2 className="form-title">Login</h2>

      <form onSubmit={handleLogin} className="form-group">
        
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="restart-btn">
          Login
        </button>
      </form>

      <p className="switch-text">
        Don’t have an account?{" "}
        <span className="link-text" onClick={goToRegister}>
          Register
        </span>
      </p>
    </div>
  );
}
