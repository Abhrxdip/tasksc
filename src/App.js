import React, { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import LandingPage from "./LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const handleLogout = () => setIsLoggedIn(false);

  // --- Show Landing Page after login ---
  if (isLoggedIn) {
    return <LandingPage handleLogout={handleLogout} />;
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
    <div className="login-wrapper">
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
            <h1 className="brand-title animate__animated animate__fadeInDown">Task Scheduler</h1>
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
                <a href="#" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert('Forgot password functionality - In a real app, this would reset your password'); }}>
                  Forgot password?
                </a>
                <a href="#" className="update-password-link" onClick={(e) => { e.preventDefault(); alert('Update password functionality - In a real app, this would allow you to change your password'); }}>
                  Update password
                </a>
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