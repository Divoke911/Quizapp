import { useState } from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterContainer({ onRegister, goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must contain 1 uppercase, 1 number, 1 special character (min 6 chars)"
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      setError("User already exists");
      return;
    }

    const newUser = { username, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setError("");
    onRegister(username);
  };

  return (
    <RegisterForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleRegister={handleRegister}
      error={error}
      goToLogin={goToLogin}
    />
  );
}
