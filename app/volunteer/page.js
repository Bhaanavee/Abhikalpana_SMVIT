'use client';

import { useRouter } from 'next/navigation'; // For navigation
import { useState } from 'react';

export default function VolunteerDashboard() {
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

  const handleBack = () => {
    router.back();
  };

  // Handle Enter key press
  const handleKeyPress = (e, path) => {
    if (e.key === 'Enter') {
      handleNavigation(path);  // Trigger navigation on Enter key press
    }
  };

  const containerStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#000000', // Black background
    color: '#FDDA0D', // Text color
    height: '100vh',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#2C2C2C', // Button background
    color: '#FDDA0D', // Button text color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={handleBack}
        style={buttonStyle}
      >
        Back
      </button>
      <br></br>
      <h1>Volunteer Dashboard</h1>
      <br></br>
      <p>Welcome to the Volunteer Dashboard. Use the buttons below to navigate.</p>
      <br></br>
      {error && <p style={errorStyle}>{error}</p>}

      <button
        onClick={() => handleNavigation('fetch-attendance')}
        onKeyDown={(e) => handleKeyPress(e, 'fetch-attendance')}  // Add Enter key functionality
        style={buttonStyle}
        aria-label="Fetch Attendance"
      >
        Fetch Attendance
      </button>

      {/* Add more navigation buttons as needed with similar functionality */}
    </div>
  );
}
