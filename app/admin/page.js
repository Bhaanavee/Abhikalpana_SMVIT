'use client';

import { useRouter } from 'next/navigation'; // For navigation
import { useState } from 'react';
import { FaUserEdit, FaCalendarCheck, FaUserPlus, FaArrowLeft } from 'react-icons/fa'; // Icons

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

  const handleGoBack = () => {
    router.back();
  };

  const headerStyle = {
    backgroundColor: '#2C2C2C',
    color: '#FFA500',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    marginBottom: '20px',
  };

  const backButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFA500',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const cardStyle = {
    backgroundColor: '#2C2C2C',
    border: '1px solid #FFA500',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    marginBottom: '20px',
    color: '#FFA500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const buttonStyle = {
    padding: '15px',
    backgroundColor: '#2C2C2C',
    color: '#FFA500',
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
  
  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFA500', minHeight: '100vh', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <button
        onClick={handleBack}
        style={{ padding: '10px', backgroundColor: '#2C2C2C', color: '#FFA500', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Back
      </button>
      <br></br>
      <h1>Admin Dashboard</h1>
      <br></br>
      <p>Select an option below to manage volunteer records and credentials:</p>
      <br></br>
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
