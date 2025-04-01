import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (!storedUser) return;
    
    setUser(storedUser);
    setUsername(storedUser.username);
  }, []);

  const handleEdit = () => setIsEditing(!isEditing);

  const handleDeleteProfile = async () => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${user.id}`);
      alert("Profile deleted successfully!");
      logout();
    } catch (error) {
      console.error("Delete Profile Error:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>{isEditing ? <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> : username}</p>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};

export default Profile;