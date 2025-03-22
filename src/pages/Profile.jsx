import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(""); // Set default to empty
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null); // Store the logged-in user
  const { logout } = useAuth();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: users } = await axios.get("https://vehicle-service-management-server.onrender.com/users");
        const loggedInUser = users.find((u) => u.username === "Pranay"); // Replace with actual logged-in username

        if (loggedInUser) {
          setUser(loggedInUser);
          setUsername(loggedInUser.username);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    logout();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("https://vehicle-service-management-server.onrender.com/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Image Upload Error:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleDeleteProfile = async () => {
    if (!user) {
      alert("User not found!");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
    if (!confirmation) return;

    try {
      console.log("Deleting user:", user.id);

      // Correct DELETE request with backticks
      await axios.delete(`https://vehicle-service-management-server.onrender.com/users/${user.id}`);

      alert("Profile deleted successfully!");
      logout();
    } catch (error) {
      console.error("Delete Profile Error:", error);
      alert("Failed to delete profile. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-image-wrapper">
        {preview ? (
          <img src={preview} alt="Profile Preview" className="profile-icon" />
        ) : (
          <img src="/path/to/default/icon.png" alt="Default Profile Icon" className="profile-icon" />
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="image-input" />
      </div>
      <div className="profile-details">
        {isEditing ? (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="edit-input"
          />
        ) : (
          <p className="username">{username}</p>
        )}
        <button onClick={handleEdit} className="edit-button">
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="profile-actions">
        <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
