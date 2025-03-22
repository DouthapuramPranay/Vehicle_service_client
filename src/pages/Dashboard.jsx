import React from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import './Dashboard.css';
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <br></br>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}!</p>
      <p>This is a Dashboard</p>
    </div>
  );
};

export default Dashboard;
