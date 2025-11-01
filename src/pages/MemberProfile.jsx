import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMemberById, getTasksByMember, calculateMemberStats } from "../data/mockData";

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = getMemberById(id || "");
  const tasks = getTasksByMember(id || "");
  const stats = calculateMemberStats(id || "");
  const [isEditing, setIsEditing] = useState(false);

  const getTeamColor = (team) => {
    const colors = {
      'Management': { bg: '#fff7ed', text: '#ea580c', border: '#fb923c' },
      'Tech': { bg: '#dbeafe', text: '#2563eb', border: '#60a5fa' },
      'Design': { bg: '#fce7f3', text: '#db2777', border: '#f472b6' },
      'PR': { bg: '#f3e8ff', text: '#7c3aed', border: '#a78bfa' },
      'Content': { bg: '#dcfce7', text: '#16a34a', border: '#4ade80' },
      'Media': { bg: '#fee2e2', text: '#dc2626', border: '#f87171' },
      'Support': { bg: '#e0f2fe', text: '#0284c7', border: '#38bdf8' }
    };
    return colors[team] || { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
  };

  if (!member) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          color: 'white'
        }}>
          <p style={{ fontSize: '1.25rem', margin: 0 }}>Member not found</p>
        </div>
      </div>
    );
  }

  const teamColor = getTeamColor(member.team);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '1.5rem',
            fontSize: '0.9375rem'
          }}
          onMouseOver={(e) => {
            e.target.style.color = 'white';
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>

        {/* Hero Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative'
        }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'white';
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <i className="fas fa-edit"></i>
          </button>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{
              width: '8rem',
              height: '8rem',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <img
                src={member.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=667eea&color=fff`}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=667eea&color=fff`;
                }}
              />
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
              <h1 style={{
                fontSize: '2.25rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '0.5rem',
                marginTop: 0
              }}>
                {member.name}
              </h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.125rem',
                marginBottom: '0.25rem',
                marginTop: 0
              }}>
                {member.rollNumber}
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '1rem',
                marginTop: 0
              }}>
                Section {member.section} • Semester {member.semester}
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '1.5rem',
                marginTop: 0
              }}>
                {member.bio || 'No bio available'}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: teamColor.bg,
                  color: teamColor.text,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: `2px solid ${teamColor.border}40`
                }}>
                  <i className="fas fa-users"></i>
                  {member.team} Team
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { label: "Total Tasks", value: stats.total, icon: "fa-calendar", color: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)" },
            { label: "Completed", value: stats.completed, icon: "fa-check-circle", color: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
            { label: "Overdue", value: stats.overdue, icon: "fa-times-circle", color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
            { label: "Win Rate", value: `${stats.winRate}%`, icon: "fa-chart-line", color: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}>
                <i className={`fas ${stat.icon}`} style={{ color: 'white', fontSize: '1.5rem' }}></i>
              </div>
              <p style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '0.25rem',
                marginTop: 0
              }}>
                {stat.value}
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.875rem',
                margin: 0
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Task History */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1.5rem',
            marginTop: 0
          }}>
            Task History
          </h2>
          {tasks.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <th style={{
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '500',
                      paddingBottom: '0.75rem',
                      paddingRight: '1rem',
                      fontSize: '0.9375rem'
                    }}>
                      Task
                    </th>
                    <th style={{
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '500',
                      paddingBottom: '0.75rem',
                      paddingRight: '1rem',
                      fontSize: '0.9375rem'
                    }}>
                      Deadline
                    </th>
                    <th style={{
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '500',
                      paddingBottom: '0.75rem',
                      paddingRight: '1rem',
                      fontSize: '0.9375rem'
                    }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr
                      key={task.id || index}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <td style={{
                        padding: '1rem 1rem 1rem 0',
                        color: 'white',
                        fontWeight: '500'
                      }}>
                        {task.taskName || task.title}
                      </td>
                      <td style={{
                        padding: '1rem 1rem 1rem 0',
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ padding: '1rem 1rem 1rem 0' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: task.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' :
                            task.priority === 'Medium' ? 'rgba(234, 179, 8, 0.2)' :
                            'rgba(22, 163, 74, 0.2)',
                          color: task.priority === 'High' ? '#ef4444' :
                            task.priority === 'Medium' ? '#eab308' :
                            '#16a34a'
                        }}>
                          {task.priority || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'center',
              padding: '2rem'
            }}>
              No tasks assigned yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

