'use client';

import { useRouter } from 'next/navigation'; // For navigation
import { useState } from 'react';
import { FaUserEdit, FaCalendarCheck, FaUserPlus, FaHome } from 'react-icons/fa'; // Icons

export default function AdminDashboard() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleNavigation = async (path) => {
    try {
      await router.push(`/admin/${path}`);
    } catch (e) {
      setError('Navigation failed. Please try again.');
      console.error('Navigation error:', e);
    }
  };

  const handleHome = () => {
    router.push('/'); // Navigate to the home page
  };

  const headerStyle = {
    backgroundColor: '#2C2C2C',
    color: '#FDDA0D',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    marginBottom: '20px',
    position: 'relative',
  };

  const homeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#2C2C2C',
    color: '#FDDA0D',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const homeButtonHoverStyle = {
    backgroundColor: '#FFA500',
    color: '#2C2C2C',
  };

  const cardStyle = {
    backgroundColor: '#2C2C2C',
    border: '1px solid #FDDA0D',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    marginBottom: '20px',
    color: '#FDDA0D',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const buttonStyle = {
    padding: '15px',
    backgroundColor: '#2C2C2C',
    color: '#FDDA0D',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    textAlign: 'left',
  };

  const errorStyle = {
    color: '#FF0000',
    marginBottom: '20px',
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FDDA0D', minHeight: '100vh', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <br></br>
        <button
          onClick={handleHome}
          style={homeButtonStyle}
          onMouseOver={(e) => e.currentTarget.style = { ...homeButtonStyle, ...homeButtonHoverStyle }}
          onMouseOut={(e) => e.currentTarget.style = homeButtonStyle}
        >
          <FaHome />
          Home
        </button>
      
      <br></br>
      <h1>Admin Dashboard</h1>
      <br></br>
      <p>Select an option below to manage volunteer records and credentials:</p>
      {error && <p style={errorStyle}>{error}</p>}
      <div>
        <div
          style={cardStyle}
          onClick={() => handleNavigation('update-volunteer')}
        >
          <button
            style={buttonStyle}
            aria-label="Update Volunteer Record"
          >
            <FaUserEdit size={24} />
            Update Volunteer Record
          </button>
        </div>
        <div
          style={cardStyle}
          onClick={() => handleNavigation('fetch-attendance')}
        >
          <button
            style={buttonStyle}
            aria-label="Fetch Attendance"
          >
            <FaCalendarCheck size={24} />
            Fetch Attendance
          </button>
        </div>
        <div
          style={cardStyle}
          onClick={() => handleNavigation('edit-volunteer')}
        >
          <button
            style={buttonStyle}
            aria-label="Edit Volunteer Credentials"
          >
            <FaUserPlus size={24} />
            Edit Volunteer Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
