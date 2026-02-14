import { useState } from "react";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import Quiz from "./containers/Quiz";
import "./styles/style.css";

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  if (user) return <Quiz />;

  return isRegistering ? (
    <RegisterContainer
      onRegister={setUser}
      goToLogin={() => setIsRegistering(false)}
    />
  ) : (
    <LoginContainer
      onLogin={setUser}
      goToRegister={() => setIsRegistering(true)}
    />
  );
}

export default App;
