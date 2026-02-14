import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function LoginContainer({ onLogin, goToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      setError("");
      onLogin(username);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
      goToRegister={goToRegister}   
    />
  );
}
