import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'assign-task'
  
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

  // Assign Task State
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    assignedTo: [],
    category: '',
    priority: '',
    deadline: '',
    attachments: null
  });

  const [errors, setErrors] = useState({});
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const taskTemplates = [
    {
      name: 'Prepare weekly meeting report',
      description: 'Compile all team updates, metrics, and action items for the weekly sync meeting.',
      category: 'Content',
      priority: 'Medium'
    },
    {
      name: 'Design event poster',
      description: 'Create an eye-catching poster for the upcoming company event with brand guidelines.',
      category: 'Design',
      priority: 'High'
    },
    {
      name: 'Fix website bugs',
      description: 'Review bug reports from last sprint and prioritize critical fixes for the website.',
      category: 'Tech',
      priority: 'High'
    }
  ];

  const priorityConfig = {
    Low: { color: '#16a34a', bg: '#dcfce7', border: '#86efac' },
    Medium: { color: '#eab308', bg: '#fef9c3', border: '#fde047' },
    High: { color: '#ea580c', bg: '#ffedd5', border: '#fdba74' }
  };

  // Get team options from members
  const teamOptions = [
    ...members.map(m => ({ id: m.id, name: m.name, type: 'member' })),
    { id: 'tech-team', name: 'Tech Team', type: 'team' },
    { id: 'design-team', name: 'Design Team', type: 'team' },
    { id: 'content-team', name: 'Content Team', type: 'team' },
    { id: 'pr-team', name: 'PR Team', type: 'team' }
  ];

  useEffect(() => {
    if (formData.deadline) {
      calculateDaysRemaining(formData.deadline);
    }
  }, [formData.deadline]);

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, assignedTo: options }));
    if (errors.assignedTo) {
      setErrors(prev => ({ ...prev, assignedTo: '' }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: e.target.files[0] }));
  };

  const handleTemplateSelect = (e) => {
    const templateIndex = e.target.value;
    if (templateIndex !== '') {
      const template = taskTemplates[templateIndex];
      setFormData(prev => ({
        ...prev,
        taskName: template.name,
        description: template.description,
        category: template.category,
        priority: template.priority
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    }
    
    if (formData.assignedTo.length === 0) {
      newErrors.assignedTo = 'Please assign to at least one member or team';
    }
    
    if (formData.deadline) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.deadline);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName: formData.taskName,
      description: formData.description,
      assignedTo: formData.assignedTo,
      category: formData.category || 'Other',
      priority: formData.priority || 'Medium',
      deadline: formData.deadline,
      attachments: formData.attachments?.name || null,
      createdAt: new Date().toISOString()
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    existingTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setFormData({
      taskName: '',
      description: '',
      assignedTo: [],
      category: '',
      priority: '',
      deadline: '',
      attachments: null
    });
    setDaysRemaining(null);
  };

  const getDeadlineMessage = () => {
    if (daysRemaining === null) return null;
    
    if (daysRemaining < 0) {
      return `⚠️ Overdue by ${Math.abs(daysRemaining)} days`;
    } else if (daysRemaining === 0) {
      return '✅ Due today!';
    } else if (daysRemaining === 1) {
      return '⏰ 1 day remaining';
    } else if (daysRemaining <= 3) {
      return `⏰ ${daysRemaining} days remaining`;
    } else {
      return `⏰ ${daysRemaining} days remaining`;
    }
  };

  const handleNavigation = (path) => {
    if (path === '/assign-task') {
      setCurrentView('assign-task');
    } else if (path === '/dashboard' || path === '/') {
      setCurrentView('dashboard');
    } else {
      console.log(`Navigating to: ${path}`);
      alert(`Navigation to: ${path}\n\nIn your actual app, this will use React Router's navigate() function.`);
    }
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
      'Content': { bg: '#dcfce7', text: '#16a34a' },
      'Convenor': { bg: '#fff7ed', text: '#ea580c' }
    };
    return colors[team] || { bg: '#f3f4f6', text: '#374151' };
  };

  return (
    <div className="animate__animated animate__fadeIn" style={{ 
        minHeight: '100vh', 
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
            onClick={() => setCurrentView('dashboard')}
            style={{
              padding: '1rem',
              background: currentView === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
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
              if (currentView !== 'dashboard') e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              if (currentView !== 'dashboard') e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </button>
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
              background: currentView === 'assign-task' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
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
              if (currentView !== 'assign-task') e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              if (currentView !== 'assign-task') e.target.style.background = 'rgba(255,255,255,0.1)';
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
      width: 'calc(100% - 280px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>

      {/* Assign Task View */}
      {currentView === 'assign-task' ? (
        <AssignTaskView 
          formData={formData}
          errors={errors}
          daysRemaining={daysRemaining}
          taskTemplates={taskTemplates}
          teamOptions={teamOptions}
          priorityConfig={priorityConfig}
          handleInputChange={handleInputChange}
          handleMultiSelect={handleMultiSelect}
          handleFileChange={handleFileChange}
          handleTemplateSelect={handleTemplateSelect}
          handleSubmit={handleSubmit}
          getDeadlineMessage={getDeadlineMessage}
        />
      ) : (
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

        {/* Members Grid Section */}
      <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1.25rem',
          boxShadow: '0 10px 40px 0 rgba(31, 38, 135, 0.2)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            padding: '1.75rem 2rem',
            borderBottom: '2px solid rgba(52, 152, 219, 0.15)',
            background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.05) 100%)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: 0
            }}>
              <i className="fas fa-users" style={{ color: '#3498db' }}></i>
              Team Members
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#7f8c8d',
                marginLeft: '0.5rem'
              }}>
                ({members.length})
              </span>
            </h3>
          </div>

          {/* Members Table Container */}
          <div style={{
            padding: '2rem',
            overflowX: 'auto',
            background: 'linear-gradient(to bottom, rgba(249, 250, 251, 0.5), rgba(255, 255, 255, 0.8))'
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 180px 150px 1fr 140px 160px',
              gap: '1.5rem',
              padding: '1.25rem 1.75rem',
              backgroundColor: 'rgba(52, 152, 219, 0.08)',
              borderRadius: '0.875rem',
              marginBottom: '1rem',
              fontWeight: '700',
              color: '#2c3e50',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '1px solid rgba(52, 152, 219, 0.15)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <i className="fas fa-camera" style={{ color: '#3498db', fontSize: '0.875rem' }}></i>
                <span>Photo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <i className="fas fa-user" style={{ color: '#3498db', fontSize: '0.875rem' }}></i>
                <span>Name</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <i className="fas fa-users" style={{ color: '#3498db', fontSize: '0.875rem' }}></i>
                <span>Team</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <i className="fas fa-envelope" style={{ color: '#3498db', fontSize: '0.875rem' }}></i>
                <span>Email Address</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <i className="fas fa-id-card" style={{ color: '#3498db', fontSize: '0.875rem' }}></i>
                <span>Roll Number</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', justifyContent: 'center' }}>
                <i className="fas fa-cog" style={{ color: '#3498db', fontSize: '0.875rem' }}></i>
                <span>Actions</span>
              </div>
            </div>

            {/* Members List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {members.map((member, index) => {
                const teamColor = getTeamColor(member.team);
                return (
                  <div
                    key={member.id}
                    className="animate__animated animate__fadeInUp"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 180px 150px 1fr 140px 160px',
                      gap: '1.5rem',
                      alignItems: 'center',
                      padding: '1.25rem 1.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.875rem',
                      border: '1px solid rgba(52, 152, 219, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      position: 'relative',
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(52, 152, 219, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(52, 152, 219, 0.25)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(52, 152, 219, 0.1)';
                    }}
                  >
                    {/* Photo */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={member.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=3498db&color=fff&size=128'}
                        alt={member.name}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '0.75rem',
                          objectFit: 'cover',
                          border: '3px solid rgba(52, 152, 219, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                          e.target.style.borderColor = 'rgba(52, 152, 219, 0.4)';
                          e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.3)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.borderColor = 'rgba(52, 152, 219, 0.2)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                      />
                    </div>

                    {/* Name */}
                    <div style={{ 
                      fontSize: '0.9375rem',
                      color: '#2c3e50',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem'
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3498db',
                        flexShrink: 0
                      }}>
                        <i className="fas fa-user" style={{ fontSize: '0.875rem' }}></i>
                      </div>
                      <span style={{ wordBreak: 'break-word', lineHeight: '1.4' }}>{member.name}</span>
                    </div>

                    {/* Team Badge */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.8125rem',
                          fontWeight: '600',
                          backgroundColor: teamColor.bg,
                          color: teamColor.text,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                          border: `1px solid ${teamColor.text}20`
                        }}
                      >
                        <i className="fas fa-circle" style={{ fontSize: '0.5rem' }}></i>
                        {member.team}
                      </span>
                    </div>

                    {/* Email */}
                    <div style={{ 
                      fontSize: '0.9375rem',
                      color: '#2c3e50',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      fontWeight: '500'
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3498db'
                      }}>
                        <i className="fas fa-envelope" style={{ fontSize: '0.875rem' }}></i>
                      </div>
                      <span style={{ wordBreak: 'break-word' }}>{member.email}</span>
                    </div>

                    {/* Roll Number */}
                    <div style={{ 
                      fontSize: '0.9375rem',
                      color: '#34495e',
                      fontFamily: '"Monaco", "Courier New", monospace',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '0.375rem',
                        backgroundColor: 'rgba(108, 117, 125, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6c757d'
                      }}>
                        <i className="fas fa-hashtag" style={{ fontSize: '0.75rem' }}></i>
                      </div>
                      <span>{member.roll}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ 
                      display: 'flex',
                      gap: '0.625rem',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => handleNavigation(`/member/${member.id}`)}
                        style={{
                          padding: '0.625rem 0.875rem',
                          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.15) 100%)',
                          border: '1px solid rgba(52, 152, 219, 0.25)',
                          borderRadius: '0.5rem',
                          color: '#3498db',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          boxShadow: '0 2px 4px rgba(52, 152, 219, 0.15)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.15) 100%)';
                          e.currentTarget.style.color = '#3498db';
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(52, 152, 219, 0.15)';
                        }}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigation(`/edit-member/${member.id}`);
                        }}
                        style={{
                          padding: '0.625rem 0.875rem',
                          background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(46, 204, 113, 0.15) 100%)',
                          border: '1px solid rgba(46, 204, 113, 0.25)',
                          borderRadius: '0.5rem',
                          color: '#2ecc71',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          boxShadow: '0 2px 4px rgba(46, 204, 113, 0.15)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(46, 204, 113, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(46, 204, 113, 0.15) 100%)';
                          e.currentTarget.style.color = '#2ecc71';
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(46, 204, 113, 0.15)';
                        }}
                        title="Edit Member"
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
      )}

      {/* Success Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '1.25rem 2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 1000,
          animation: 'slideInUp 0.3s ease-out'
        }}>
          <i className="fas fa-check-circle" style={{ fontSize: '1.5rem' }}></i>
          <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>Task assigned successfully!</span>
        </div>
      )}
      </div>
    </div>
  );
};

// Assign Task View Component
const AssignTaskView = ({
  formData,
  errors,
  daysRemaining,
  taskTemplates,
  teamOptions,
  priorityConfig,
  handleInputChange,
  handleMultiSelect,
  handleFileChange,
  handleTemplateSelect,
  handleSubmit,
  getDeadlineMessage
}) => {
  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          📝 Assign a New Task
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
          Fill out the details below to assign tasks efficiently to your team.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Main Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Template Selector */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '0.75rem'
              }}>
                <i className="fas fa-magic" style={{ marginRight: '0.5rem' }}></i>
                Quick Template (Optional)
              </label>
              <select
                onChange={handleTemplateSelect}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(102, 126, 234, 0.05)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '0.75rem',
                  fontSize: '0.9375rem',
                  color: '#2c3e50',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select a template...</option>
                {taskTemplates.map((template, idx) => (
                  <option key={idx} value={idx}>{template.name}</option>
                ))}
              </select>
            </div>

            <div style={{ borderTop: '1px solid rgba(102, 126, 234, 0.2)', paddingTop: '1.5rem' }}></div>

            {/* Task Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '0.75rem'
              }}>
                Task Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                placeholder="Enter task name..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: `1px solid ${errors.taskName ? '#ef4444' : 'rgba(102, 126, 234, 0.2)'}`,
                  borderRadius: '0.75rem',
                  fontSize: '0.9375rem',
                  color: '#2c3e50'
                }}
              />
              {errors.taskName && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }}>
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.taskName}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '0.75rem'
              }}>
                Description / Requirements
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the task in detail..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '0.75rem',
                  fontSize: '0.9375rem',
                  color: '#2c3e50',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Two-column layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              {/* Assign To */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '0.75rem'
                }}>
                  <i className="fas fa-users" style={{ marginRight: '0.5rem' }}></i>
                  Assign To <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  multiple
                  value={formData.assignedTo}
                  onChange={handleMultiSelect}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${errors.assignedTo ? '#ef4444' : 'rgba(102, 126, 234, 0.2)'}`,
                    borderRadius: '0.75rem',
                    fontSize: '0.9375rem',
                    color: '#2c3e50',
                    minHeight: '120px',
                    cursor: 'pointer'
                  }}
                >
                  {teamOptions.map(option => (
                    <option key={option.id} value={option.name}>
                      {option.type === 'team' ? '👥' : '👤'} {option.name}
                    </option>
                  ))}
                </select>
                {errors.assignedTo && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem'
                  }}>
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.assignedTo}
                  </div>
                )}
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                  Hold Ctrl/Cmd to select multiple
                </p>
              </div>

              {/* Category */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '0.75rem'
                }}>
                  <i className="fas fa-tag" style={{ marginRight: '0.5rem' }}></i>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '0.75rem',
                    fontSize: '0.9375rem',
                    color: '#2c3e50',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select category...</option>
                  <option value="Tech">Tech</option>
                  <option value="PR">PR</option>
                  <option value="Design">Design</option>
                  <option value="Content">Content</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Priority and Deadline */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              {/* Priority */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '0.75rem'
                }}>
                  <i className="fas fa-bolt" style={{ marginRight: '0.5rem' }}></i>
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '0.75rem',
                    fontSize: '0.9375rem',
                    color: '#2c3e50',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select priority...</option>
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>
                {formData.priority && (
                  <div style={{
                    marginTop: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: priorityConfig[formData.priority].color,
                    background: priorityConfig[formData.priority].bg,
                    border: `2px solid ${priorityConfig[formData.priority].border}`
                  }}>
                    {formData.priority}
                  </div>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '0.75rem'
                }}>
                  <i className="fas fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${errors.deadline ? '#ef4444' : 'rgba(102, 126, 234, 0.2)'}`,
                    borderRadius: '0.75rem',
                    fontSize: '0.9375rem',
                    color: '#2c3e50'
                  }}
                />
                {errors.deadline && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem'
                  }}>
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.deadline}
                  </div>
                )}
                {formData.deadline && !errors.deadline && getDeadlineMessage() && (
                  <div style={{
                    marginTop: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: daysRemaining <= 3 ? '#ea580c' : '#16a34a'
                  }}>
                    <i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>
                    {getDeadlineMessage()}
                  </div>
                )}
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '0.75rem'
              }}>
                Attachments (Optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '0.75rem',
                  fontSize: '0.9375rem',
                  color: '#2c3e50'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
              Assign Task
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          position: 'sticky',
          top: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <i className="fas fa-file-alt" style={{ color: '#667eea' }}></i>
            Task Preview
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              padding: '1rem',
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(102, 126, 234, 0.1)'
            }}>
              <p style={{ fontSize: '0.75rem', color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>
                TASK NAME
              </p>
              <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2c3e50' }}>
                {formData.taskName || 'Untitled Task'}
              </p>
            </div>

            {formData.assignedTo.length > 0 && (
              <div style={{
                padding: '1rem',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#667eea', fontWeight: '700', marginBottom: '0.75rem' }}>
                  <i className="fas fa-users" style={{ marginRight: '0.5rem' }}></i>
                  ASSIGNED TO
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.assignedTo.map((member, idx) => (
                    <span key={idx} style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '2rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.category && (
              <div style={{
                padding: '1rem',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>
                  <i className="fas fa-tag" style={{ marginRight: '0.5rem' }}></i>
                  CATEGORY
                </p>
                <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {formData.category}
                </span>
              </div>
            )}

            {formData.priority && (
              <div style={{
                padding: '1rem',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>
                  PRIORITY
                </p>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: priorityConfig[formData.priority].color,
                  background: priorityConfig[formData.priority].bg,
                  border: `2px solid ${priorityConfig[formData.priority].border}`
                }}>
                  {formData.priority}
                </span>
              </div>
            )}

            {formData.deadline && (
              <div style={{
                padding: '1rem',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>
                  <i className="fas fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>
                  DEADLINE
                </p>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#2c3e50', marginBottom: '0.5rem' }}>
                  {new Date(formData.deadline).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                {daysRemaining !== null && getDeadlineMessage() && (
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: daysRemaining <= 3 ? '#ea580c' : '#16a34a'
                  }}>
                    <i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>
                    {getDeadlineMessage()}
                  </div>
                )}
              </div>
            )}

            {!formData.taskName && formData.assignedTo.length === 0 && !formData.deadline && (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: '#94a3b8'
              }}>
                <i className="fas fa-file-alt" style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}></i>
                <p style={{ fontSize: '0.875rem' }}>Start filling the form to see a preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;