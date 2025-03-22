import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // For error messages
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
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.get(
        "https://vehicle-service-management-server.onrender.com/users"
      );

      // Ensure proper data exists
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Unexpected response format");
      }

      const user = response.data.find(
        (user) =>
          user.username.trim().toLowerCase() === username.trim().toLowerCase() &&
          user.password.trim() === password.trim()
      );

      if (!user) {
        setError("Invalid username or password");
        return;
      }

      // Save the authenticated user to localStorage
      localStorage.setItem("authUser", JSON.stringify(user));
      login(user);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again.");
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