import React, { useState, useEffect } from "react";
import Chat from "./components/chat";
import Login from "./components/Login";
import Signup from "./components/signup"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loggedInUser")) || null);
  const [isSigningUp, setIsSigningUp] = useState(false); // Handle Signup Page

  useEffect(() => {
    if (isLoggedIn) {
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <Chat setIsLoggedIn={setIsLoggedIn} user={user} />
      ) : isSigningUp ? (
        <Signup setIsSigningUp={setIsSigningUp} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setIsSigningUp={setIsSigningUp} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
