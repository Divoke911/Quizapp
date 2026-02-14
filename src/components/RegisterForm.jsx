export default function RegisterForm({
  username,
  password,
  setUsername,
  setPassword,
  handleRegister,
  error,
  goToLogin
}) {
  return (
    <div className="quiz-container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="restart-btn">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <span
          onClick={goToLogin}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}
