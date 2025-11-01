import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMember() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    section: "",
    semester: "",
    bio: "",
    profileImage: "",
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const teams = ["Management", "Tech", "Design", "PR", "Content", "Media", "Support"];

  const getTeamColor = (team) => {
    const colors = {
      Management: { bg: 'rgba(251, 191, 36, 0.2)', border: 'rgba(251, 191, 36, 0.5)', color: '#fbbf24' },
      Tech: { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.5)', color: '#3b82f6' },
      Design: { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgba(168, 85, 247, 0.5)', color: '#a855f7' },
      PR: { bg: 'rgba(34, 197, 94, 0.2)', border: 'rgba(34, 197, 94, 0.5)', color: '#22c55e' },
      Content: { bg: 'rgba(236, 72, 153, 0.2)', border: 'rgba(236, 72, 153, 0.5)', color: '#ec4899' },
      Media: { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.5)', color: '#ef4444' },
      Support: { bg: 'rgba(14, 165, 233, 0.2)', border: 'rgba(14, 165, 233, 0.5)', color: '#0ea5e9' }
    };
    return colors[team] || colors.Tech;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData({ ...formData, profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedTeam) {
      alert("Please select a team");
      return;
    }

    if (!formData.name || !formData.rollNumber || !formData.section || !formData.semester) {
      alert("Please fill all required fields");
      return;
    }

    // Save member to localStorage
    const newMember = {
      id: Date.now().toString(),
      name: formData.name,
      rollNumber: formData.rollNumber,
      section: formData.section,
      semester: parseInt(formData.semester),
      team: selectedTeam,
      bio: formData.bio || "",
      profileImage: formData.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=667eea&color=fff`,
      joinedDate: new Date().toISOString().split('T')[0],
      email: `${formData.rollNumber.toLowerCase()}@example.com`
    };

    // Get existing members from localStorage or use default
    const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
    existingMembers.push(newMember);
    localStorage.setItem('members', JSON.stringify(existingMembers));

    alert("Member created successfully! 🎉");
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  const themeBg = isDarkMode 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : '#ffffff';
  const themeText = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#2c3e50';
  const themeCardBg = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)';
  const themeBorder = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const themeInputBg = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 1)';
  const themeInputBorder = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: themeBg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      position: 'relative'
    }}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          background: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          border: `2px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'}`,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDarkMode ? '#ffd700' : '#667eea',
          fontSize: '1.25rem',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        animation: 'fadeIn 0.5s ease-in'
      }}>
        <div style={{
          background: themeCardBg,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: `1px solid ${themeBorder}`,
          boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}>
            <i className="fas fa-user-plus" style={{ fontSize: '2.25rem', color: '#00d9ff' }}></i>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: themeText,
              margin: 0
            }}>
              Create New Member
            </h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Profile Image Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '8rem',
                  height: '8rem',
                  borderRadius: '50%',
                  background: themeCardBg,
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  border: `2px solid ${themeBorder}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = themeBorder;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}>
                      <i className="fas fa-upload" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                      <p style={{ fontSize: '0.875rem', margin: 0 }}>Upload Photo</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Name */}
            <div>
              <label style={{
                display: 'block',
                color: themeText,
                marginBottom: '0.5rem',
                fontWeight: '500',
                fontSize: '0.9375rem'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: themeInputBg,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${themeInputBorder}`,
                  borderRadius: '0.75rem',
                  color: themeText,
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Enter full name"
                required
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = themeInputBorder}
              />
            </div>

            {/* Roll Number */}
            <div>
              <label style={{
                display: 'block',
                color: themeText,
                marginBottom: '0.5rem',
                fontWeight: '500',
                fontSize: '0.9375rem'
              }}>
                Roll Number *
              </label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value.toUpperCase() })
                }
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: themeInputBg,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${themeInputBorder}`,
                  borderRadius: '0.75rem',
                  color: themeText,
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="e.g., 21CS001"
                required
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = themeInputBorder}
              />
            </div>

            {/* Section & Semester */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: themeText,
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  fontSize: '0.9375rem'
                }}>
                  Section *
                </label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: themeInputBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${themeInputBorder}`,
                    borderRadius: '0.75rem',
                    color: themeText,
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = themeInputBorder}
                >
                  <option value="" style={{ background: isDarkMode ? '#1a1a2e' : '#fff', color: themeText }}>Select</option>
                  <option value="CSE1" style={{ background: isDarkMode ? '#1a1a2e' : '#fff', color: themeText }}>CSE1</option>
                  <option value="CSE2" style={{ background: isDarkMode ? '#1a1a2e' : '#fff', color: themeText }}>CSE2</option>
                  <option value="CSE3" style={{ background: isDarkMode ? '#1a1a2e' : '#fff', color: themeText }}>CSE3</option>
                  <option value="CSE4" style={{ background: isDarkMode ? '#1a1a2e' : '#fff', color: themeText }}>CSE4</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: themeText,
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  fontSize: '0.9375rem'
                }}>
                  Semester *
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: themeInputBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${themeInputBorder}`,
                    borderRadius: '0.75rem',
                    color: themeText,
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="1-8"
                  required
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = themeInputBorder}
                />
              </div>
            </div>

            {/* Team Selection */}
            <div>
              <label style={{
                display: 'block',
                color: themeText,
                marginBottom: '1rem',
                fontWeight: '500',
                fontSize: '0.9375rem'
              }}>
                Select Team *
              </label>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                {teams.map((team) => {
                  const teamColors = getTeamColor(team);
                  const isSelected = selectedTeam === team;
                  return (
                    <div key={team} style={{ textAlign: 'center', cursor: 'pointer' }}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <div style={{
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '50%',
                        background: isSelected ? teamColors.bg : themeCardBg,
                        border: `3px solid ${isSelected ? teamColors.border : themeBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        boxShadow: isSelected ? `0 0 0 4px ${isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(102, 126, 234, 0.3)'}` : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.background = teamColors.bg;
                          e.currentTarget.style.borderColor = teamColors.border;
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.background = themeCardBg;
                          e.currentTarget.style.borderColor = themeBorder;
                        }
                      }}
                      >
                        <i className={`fas ${
                          team === 'Management' ? 'fa-crown' :
                          team === 'Tech' ? 'fa-microchip' :
                          team === 'Design' ? 'fa-palette' :
                          team === 'Content' ? 'fa-file-alt' :
                          team === 'PR' ? 'fa-bullhorn' :
                          team === 'Media' ? 'fa-video' :
                          team === 'Support' ? 'fa-headset' :
                          'fa-users'
                        }`}
                          style={{ fontSize: '2rem', color: teamColors.color }}></i>
                      </div>
                      <p style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>
                        {team}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label style={{
                display: 'block',
                color: themeText,
                marginBottom: '0.5rem',
                fontWeight: '500',
                fontSize: '0.9375rem'
              }}>
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '0.875rem 1rem',
                  background: themeInputBg,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${themeInputBorder}`,
                  borderRadius: '0.75rem',
                  color: themeText,
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                placeholder="Tell us about yourself (max 150 characters)"
                maxLength={150}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = themeInputBorder}
              />
              <p style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: 0 }}>
                {formData.bio.length}/150
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              Create Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

