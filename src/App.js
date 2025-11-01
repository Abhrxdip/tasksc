import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import LandingPage from "./LandingPage";
import CreateMember from "./pages/CreateMember";
import MemberProfile from "./pages/MemberProfile";
import ViewTasks from "./pages/ViewTasks";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get from localStorage or default to false
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // --- Handle sign-in ---
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email === "demo@demo.com" && password === "demo123") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
      }, 1500);
    } else {
      alert("Invalid demo credentials. Try:\nEmail: demo@demo.com\nPassword: demo123");
    }
  };

  // --- Handle logout ---
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // --- Toggle dark mode ---
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // --- Show Landing Page after login ---
  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<LandingPage handleLogout={handleLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/create-member" element={<CreateMember />} />
          <Route path="/member/:id" element={<MemberProfile />} />
          <Route path="/view-tasks" element={<ViewTasks />} />
          <Route path="/assign-task" element={<LandingPage handleLogout={handleLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // --- Show loading animation ---
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your workspace...</p>
      </div>
    );
  }

  // --- Default: Show Sign In Page ---
  return (
    <div className={`login-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          background: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          border: `2px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#667eea',
          fontSize: '1.5rem',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1) rotate(15deg)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1) rotate(0deg)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
      
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="branding-side">
          <div className="branding-content animate__animated animate__fadeInLeft">
            <div className="logo-animation">
              <i className="fas fa-tasks animate__animated animate__pulse animate__infinite"></i>
            </div>
            <h1 className="brand-title animate__animated animate__fadeInDown">Students Chapter CSE Task Manager</h1>
            <p className="brand-subtitle animate__animated animate__fadeIn animate__delay-1s">Organize • Prioritize • Achieve</p>
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Manage your team effortlessly</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Track tasks in real-time</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Collaborate seamlessly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="form-side">
          <div className="form-content">
            <div className="form-header animate__animated animate__fadeInRight">
              <h2 className="animate__animated animate__fadeInDown animate__delay-1s">Welcome Back!</h2>
              <p className="animate__animated animate__fadeIn animate__delay-1s">Please sign in to continue</p>
            </div>
            
            <form onSubmit={handleSignIn} className="signin-form animate__animated animate__fadeInUp animate__delay-1s">
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input type="email" placeholder="Email Address" required />
              </div>
              
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input type="password" placeholder="Password" required />
              </div>
              
              <div className="form-options">
                <button type="button" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert('Forgot password functionality - In a real app, this would reset your password'); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  Forgot password?
                </button>
                <button type="button" className="update-password-link" onClick={(e) => { e.preventDefault(); alert('Update password functionality - In a real app, this would allow you to change your password'); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  Update password
                </button>
              </div>
              
              <button type="submit" className="signin-button">
                <span>Sign In</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              
              <div className="demo-credentials">
                <i className="fas fa-info-circle"></i>
                <small>Demo: demo@demo.com / demo123</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
