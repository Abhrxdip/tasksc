import React, { useState } from "react";

export default function ViewTasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");

  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  const teams = ["All", "Management", "Tech", "Design", "PR", "Content", "Media", "Support"];

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

  const getPriorityColor = (priority) => {
    const colors = {
      Low: { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
      Medium: { bg: '#fef9c3', text: '#eab308', border: '#fde047' },
      High: { bg: '#ffedd5', text: '#ea580c', border: '#fdba74' }
    };
    return colors[priority] || colors.Medium;
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo?.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTeam = selectedTeam === "All" || 
      (task.assignedTo?.some(name => {
        // Get member from localStorage to check team
        const members = JSON.parse(localStorage.getItem('members') || '[]');
        const member = members.find(m => m.name === name);
        return member && member.team === selectedTeam;
      }));
    
    return matchesSearch && matchesTeam;
  });

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginTop: 0
          }}>
            Task Dashboard
          </h1>

          {/* Search Bar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.5)'
              }}></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks or members by name..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
            </div>
          </div>

          {/* Team Filter */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500',
              marginBottom: '1rem',
              textAlign: 'center',
              fontSize: '1rem'
            }}>
              Filter by Team
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              {teams.map((team) => {
                const isSelected = selectedTeam === team;
                const teamColors = team !== 'All' ? getTeamColor(team) : null;
                return (
                  <div
                    key={team}
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => setSelectedTeam(team)}
                  >
                    {team === "All" ? (
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        border: isSelected ? '4px solid rgba(255, 255, 255, 0.5)' : '2px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>✨</span>
                      </div>
                    ) : (
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        background: isSelected ? teamColors.bg : 'rgba(255, 255, 255, 0.1)',
                        border: isSelected ? `4px solid ${teamColors.border}` : '2px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)'
                      }}>
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
                          style={{ fontSize: '1.5rem', color: isSelected ? teamColors.color : 'rgba(255, 255, 255, 0.5)' }}></i>
                      </div>
                    )}
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      marginBottom: 0
                    }}>
                      {team}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredTasks.map((task, index) => {
            const priorityColor = getPriorityColor(task.priority);
            return (
              <div
                key={task.id || index}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '0.75rem',
                  marginTop: 0
                }}>
                  {task.taskName}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9375rem',
                  marginBottom: '1rem',
                  marginTop: 0,
                  lineHeight: '1.5'
                }}>
                  {task.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {task.assignedTo?.map((name, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white'
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem'
                }}>
                  <span style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    backgroundColor: priorityColor.bg,
                    color: priorityColor.text,
                    border: `1px solid ${priorityColor.border}`
                  }}>
                    {task.priority || 'Medium'}
                  </span>
                  {task.deadline && (
                    <span style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem'
                    }}>
                      <i className="fas fa-calendar" style={{ marginRight: '0.25rem' }}></i>
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '1.25rem'
          }}>
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
}

