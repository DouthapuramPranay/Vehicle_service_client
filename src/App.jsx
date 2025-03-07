import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles.css';

const services = [
  {
    image: 'https://www.shutterstock.com/image-vector/oil-change-icon-logo-vector-260nw-1568039914.jpg',
    title: 'Oil Change',
    description: 'Regular oil changes to keep your vehicle running smoothly.',
  },
  {
    image: 'https://img.freepik.com/premium-vector/people-set-profession-technician_344186-732.jpg',
    title: 'Tire Rotation',
    description: 'Regular tire rotation to ensure even tread wear and extend tire life.',
  },
  {
    image: 'https://img.freepik.com/free-vector/auto-mechanicconcept-illustration_114360-16748.jpg',
    title: 'Vehicle Inspection',
    description: 'Comprehensive vehicle inspections to identify potential issues before they become major problems.',
  },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
    <AuthProvider>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
     
      <div>
        <header className="header">
          <div className="navbar">
            <div className="logo-container">
              <img src="https://t3.ftcdn.net/jpg/05/18/32/78/360_F_518327895_sEJ0spaygdutmQ25Jw38Wb1MWB4gnWvB.jpg" alt="Logo" className="header-logo" />
            </div>
            <nav>
              <a href="home">Home</a>
              <a href="about-us">About Us</a>
              <a href="contact">Contact</a>
              <a href="login">Login</a>
              <a href="register">Register</a>
              <a href="profile">Profile</a>
            </nav>
          </div>
          <div className="header-content">
            <h1 className="title">Vehicle Service Management</h1>
            <h2 className="subtitle">Expert Care for Your Vehicle!</h2>
          </div>
          <div className="header-image">
            <img src="https://img.freepik.com/free-vector/dad-son-fixing-car-together-white-background_1308-78114.jpg" alt="Vehicle Service" />
          </div>
          <div className="explore-container">
            <button onClick={() => scrollToSection('services')} className="explore-button">Explore Services</button>
          </div>
        </header>
        <section id="services" className="services">
          <div className="service-container">
            {services.map((service, index) => (
              <div className="service" key={index}>
                <img src={service.image} className="service-image" alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="service-form" className="service-form">
          <h2>Schedule a Service</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="service-type">Service Type:</label>
            <select id="service-type" name="service-type">
              <option value="oil-change">Oil Change</option>
              <option value="tire-rotation">Tire Rotation</option>
              <option value="vehicle-inspection">Vehicle Inspection</option>
            </select>
            <button type="submit">Schedule</button>
          </form>
        </section>
      </div>
      <Footer />
    </AuthProvider>
    </Router>
  );
};

export default App;
