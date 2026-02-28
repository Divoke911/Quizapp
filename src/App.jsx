import { useEffect, useState } from "react";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import Quiz from "./containers/Quiz";

const AUTH_USER_KEY = "authUser";
const LAST_ACTIVITY_KEY = "lastActivityAt";
// const INACTIVITY_LIMIT_MS = 60 * 60 * 1000;
const INACTIVITY_LIMIT_MS = 1 * 60 * 1000;
const SESSION_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

const setCookie = (name, value, maxAgeSeconds = SESSION_COOKIE_MAX_AGE_SECONDS) => {
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
};

const getCookie = (name) => {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const target = `${name}=`;
  const cookie = cookies.find((entry) => entry.startsWith(target));
  return cookie ? decodeURIComponent(cookie.substring(target.length)) : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = getCookie(AUTH_USER_KEY);
    const lastActivityAt = Number(getCookie(LAST_ACTIVITY_KEY));

    if (!savedUser || !lastActivityAt) return null;

    const isExpired = Date.now() - lastActivityAt > INACTIVITY_LIMIT_MS;
    if (isExpired) {
      deleteCookie(AUTH_USER_KEY);
      deleteCookie(LAST_ACTIVITY_KEY);
      return null;
    }

    return savedUser;
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const loginUser = (username) => {
    setUser(username);
    setCookie(AUTH_USER_KEY, username);
    setCookie(LAST_ACTIVITY_KEY, String(Date.now()));
  };

  const logoutUser = () => {
    setUser(null);
    deleteCookie(AUTH_USER_KEY);
    deleteCookie(LAST_ACTIVITY_KEY);
  };

  useEffect(() => {
    if (!user) return;

    const updateActivity = () => {
      setCookie(LAST_ACTIVITY_KEY, String(Date.now()));
    };

    const checkInactivity = () => {
      const lastActivityAt = Number(getCookie(LAST_ACTIVITY_KEY));
      if (!lastActivityAt) return;

      if (Date.now() - lastActivityAt > INACTIVITY_LIMIT_MS) {
        logoutUser();
      }
    };

    const events = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart"
    ];

    events.forEach((event) => window.addEventListener(event, updateActivity));
    document.addEventListener("visibilitychange", checkInactivity);

    const intervalId = setInterval(checkInactivity, 60 * 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, updateActivity));
      document.removeEventListener("visibilitychange", checkInactivity);
      clearInterval(intervalId);
    };
  }, [user]);

  if (user) return <Quiz onLogout={logoutUser} />;

  return isRegistering ? (
    <RegisterContainer
      onRegister={loginUser}
      goToLogin={() => setIsRegistering(false)}
    />
  ) : (
    <LoginContainer
      onLogin={loginUser}
      goToRegister={() => setIsRegistering(true)}
    />
  );
}

export default App;
