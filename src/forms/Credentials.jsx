import React from 'react';
import './Credentials.css';

const Credentials = ({ formData, setFormData, handleSubmit }) => {
  return (
    <div className="credentials-container">
      <h2>Credentials</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        className="credentials-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="credentials-input"
      />
      <button onClick={handleSubmit} className="credentials-button">Register</button>
    </div>
  );
};

export default Credentials;
