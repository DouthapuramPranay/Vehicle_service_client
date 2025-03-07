import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(null); // Add state for error handling
  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    const userResponse = await axios.get(`https://vehicle-service-management-server.onrender.com/users`);
    console.log('API Response:', userResponse.data);

    const user = userResponse.data[0];

    if (!user) {
      setError('Username does not exist');
      return;
    }

    // Log the entered password and the stored password
    console.log('Entered Password:', password);
    console.log('Stored Password:', user.password);

    // Step 2: Validate the password (with trimming)
    if (!user || user.password.trim() !== password.trim()) {
      setError('Incorrect password');
      return;
    }

    // Step 3: Login via AuthContext
    login(user); // Pass the user data to context
    navigate('/dashboard'); // Navigate to dashboard
  } 
  catch (error) {
    console.error('Login Error:', error);
    setError('An error occurred. Please try again.');
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <div className="icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default Login;