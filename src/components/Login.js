import React, { useState } from "react";
import "../style/login.css";

const Login = ({ setIsLoggedIn, setIsSigningUp, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Users in localStorage:", users);

    const user = users.find((u) => u.email === email && u.password === password);
    
    if (user) {
      console.log("Login successful for:", user);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(user)); 

      if (setUser) {
        setUser(user);
      }
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <h2>ChatGPT Clone</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Log in</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={(e) => { 
            e.preventDefault();
            setIsSigningUp(true); 
          }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
