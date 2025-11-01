import React from 'react';

const LandingPage = () => {
  // Dummy member data
  const members = [
    {
      id: 1,
      name: 'Chukrit Da',
      team: 'Convenor',
      email: 'abc@aot.edu.in',
      roll: '69',
      image: 'https://picsum.photos/200'
    },
    {
      id: 2,
      name: 'Elon Musk',
      team: 'Tech',
      email: 'c@company.com',
      roll: 'TECH002',
      image: ''
    },
    
  ];

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    alert(`Navigation to: ${path}\n\nIn your actual app, this will use React Router's navigate() function.`);
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    handleNavigation('/login');
  };

  const getTeamColor = (team) => {
    const colors = {
      'PR': { bg: '#f3e8ff', text: '#7c3aed' },
      'Tech': { bg: '#dbeafe', text: '#2563eb' },
      'Design': { bg: '#fce7f3', text: '#db2777' },
      'Content': { bg: '#dcfce7', text: '#16a34a' }
    };
    return colors[team] || { bg: '#f3f4f6', text: '#374151' };
  };

  return (
    <div className="animate__animated animate__fadeIn" style={{ 
        height: '100vh', 
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        position: 'relative',
        display: 'flex',
        width: '100%'
      }}>
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '280px',
        height: '100vh',
        background: 'linear-gradient(45deg, #2c3e50, #3498db)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: '2'
      }}>

      {/* Sidebar Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Logo Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '800', 
            color: 'white',
            letterSpacing: '-0.025em',
            marginBottom: '0.5rem'
          }}>
            TaskSc
          </h1>
          <span style={{ 
            fontSize: '0.875rem', 
            color: 'rgba(255,255,255,0.9)',
            display: 'block'
          }}>
            Task Management
          </span>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: 'auto' }}>
          <button
            onClick={() => handleNavigation('/create-member')}
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <i className="fas fa-user-plus"></i>
            Create Member
          </button>
          
          <button
            onClick={() => handleNavigation('/assign-task')}
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <i className="fas fa-tasks"></i>
            Assign Task
          </button>
          
          <button
            onClick={() => handleNavigation('/view-tasks')}
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <i className="fas fa-list-check"></i>
            View Tasks
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s ease',
            marginTop: 'auto',
            width: '100%',
            textAlign: 'left'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>

    </div>

    {/* Main Content Area */}
    <div style={{
      marginLeft: '280px',
      flex: '1',
      padding: '2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      minHeight: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>

      {/* Main Content */}
      <div style={{ width: '100%' }}>
        {/* Page Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}>
          <div className="animate__animated animate__fadeInDown">
            <h2 style={{ 
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '0.5rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Team Overview
            </h2>
            <p style={{ color: '#34495e' }} className="animate__animated animate__fadeIn animate__delay-1s">
              Manage and monitor your team's activities
            </p>
          </div>
          
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.25)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
          }}>
            <div style={{ color: '#3498db', marginBottom: '0.5rem' }}>
              <i className="fas fa-users fa-lg"></i>
            </div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '0.25rem'
            }}>
              {members.length}
            </h3>
            <p style={{ color: '#34495e' }}>Total Members</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.25)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
          }}>
            <div style={{ color: '#2ecc71', marginBottom: '0.5rem' }}>
              <i className="fas fa-list-check fa-lg"></i>
            </div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '0.25rem'
            }}>
              12
            </h3>
            <p style={{ color: '#34495e' }}>Active Tasks</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.25)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
          }}>
            <div style={{ color: '#e67e22', marginBottom: '0.5rem' }}>
              <i className="fas fa-chart-line fa-lg"></i>
            </div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '0.25rem'
            }}>
              89%
            </h3>
            <p style={{ color: '#34495e' }}>Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Members Grid Section */}
      <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          overflow: 'hidden',
          maxHeight: '600px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(52, 152, 219, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className="fas fa-users"></i>
              Team Members
            </h3>
          </div>

          {/* Members Table */}
          <div style={{
            padding: '1.5rem',
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0.75rem',
              marginBottom: '1rem',
              fontWeight: '600',
              color: '#2c3e50',
              fontSize: '0.875rem',
              minWidth: '1000px',
              border: '1px solid rgba(52, 152, 219, 0.2)',
              position: 'sticky',
              top: '0',
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <span style={{ flex: '0 0 50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-camera"></i>
                Photo
              </span>
              <span style={{ flex: '0 0 200px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-user"></i>
                Name
              </span>
              <span style={{ flex: '0 0 120px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-users"></i>
                Team
              </span>
              <span style={{ flex: '0 0 250px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-envelope"></i>
                Email
              </span>
              <span style={{ flex: '0 0 120px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-id-card"></i>
                Roll
              </span>
              <span style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-cog"></i>
                Actions
              </span>
            </div>
            {members.map((member) => {
              const teamColor = getTeamColor(member.team);
              return (
                <div
                  key={member.id}
                  className="animate__animated animate__fadeInUp"
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderBottom: '1px solid rgba(52, 152, 219, 0.06)',
                    transition: 'all 0.3s ease',
                    minWidth: '1000px',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    position: 'relative',
                    zIndex: 0,
                    animationDelay: `${member.id * 0.1}s`
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ flex: '0 0 50px' }}>
                    <img
                      src={member.image || 'https://via.placeholder.com/40'}
                      alt={member.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '0.5rem',
                        objectFit: 'cover',
                        border: '2px solid #e5e7eb'
                      }}
                    />
                  </div>
                  
                  <div style={{ 
                    flex: '0 0 200px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#0f172a'
                  }}>
                    {member.name}
                  </div>

                  <div style={{ flex: '0 0 120px' }}>
                    <span
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: teamColor.bg,
                        color: teamColor.text,
                        display: 'inline-block'
                      }}
                    >
                      {member.team}
                    </span>
                  </div>

                  <div style={{ 
                    flex: '0 0 250px',
                    fontSize: '0.875rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <i className="fas fa-envelope" style={{ fontSize: '0.875rem' }}></i>
                    {member.email}
                  </div>

                  <div style={{ 
                    flex: '0 0 120px',
                    fontSize: '0.875rem',
                    color: '#64748b',
                    fontFamily: 'monospace'
                  }}>
                    {member.roll}
                  </div>

                  <div style={{ 
                    flex: '1',
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => handleNavigation(`/member/${member.id}`)}
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(52, 152, 219, 0.1)',
                        border: '1px solid rgba(52, 152, 219, 0.2)',
                        borderRadius: '0.375rem',
                        color: '#3498db',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(52, 152, 219, 0.2)';
                        e.target.style.color = '#2980b9';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(52, 152, 219, 0.1)';
                        e.target.style.color = '#3498db';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigation(`/edit-member/${member.id}`);
                      }}
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(46, 204, 113, 0.1)',
                        border: '1px solid rgba(46, 204, 113, 0.2)',
                        borderRadius: '0.375rem',
                        color: '#2ecc71',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(46, 204, 113, 0.2)';
                        e.target.style.color = '#27ae60';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(46, 204, 113, 0.1)';
                        e.target.style.color = '#2ecc71';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;