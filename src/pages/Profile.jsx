import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      setUser(storedUser);
      setUsername(storedUser.username);
    }
  }, []);

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/update/${user.id}`, { username });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };
  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${user.id}`);
      alert("Profile deleted successfully!");
      localStorage.removeItem("authUser");
      window.location.reload();
    } catch (error) {
      console.error("Delete Profile Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>
        {isEditing ? (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          username
        )}
      </p>
      <button onClick={isEditing ? handleSave : handleEdit} className="edit-button">
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={handleDeleteProfile} className="delete-button">
        Delete Profile
      </button>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;