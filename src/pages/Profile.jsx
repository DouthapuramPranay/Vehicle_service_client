import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth context
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Pranay'); // Example username
  const { logout } = useAuth(); // Get the logout function from useAuth context

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
  };

  return (
    <div className="profile-container">
      <br></br>
      <br></br>
      <img src="/path/to/profile/icon.png" alt="Profile Icon" className="profile-icon" />
      <h2>This is a profile</h2>
      {isEditing ? (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="edit-input"
        />
      ) : (
        <p>{username}</p>
      )}
      <button onClick={handleEdit} className="edit-button">
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <br></br>
      <button onClick={handleLogout} className="logout-button">
        
        Logout
      </button>
    </div>
  );
};

export default Profile;
