import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [error, setError] = useState(null); // Error messages
  const { login } = useAuth(); // Authentication context
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        username: username.trim().toLowerCase(),
        password: password.trim(),
      });

      // If login is successful, save user to localStorage
      const user = response.data; // Assuming API returns a single user object
      if (!user) {
        setError("Invalid username or password");
        return;
      }

      // Save authenticated user and redirect
      localStorage.setItem("authUser", JSON.stringify(user));
      login(user); // Set user in authentication context
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login-field">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="login-field">
          <label>Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <div
              className="icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;