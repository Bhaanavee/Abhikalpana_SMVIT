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

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Volunteer Dashboard</h1>
      <p>Welcome to the Volunteer Dashboard. Use the buttons below to navigate.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={() => handleNavigation('fetch-attendance')}
        style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#FFA500', color: '#FFA500', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        aria-label="Fetch Attendance"
      >
        Fetch Attendance
      </button>
      {/* Add more navigation buttons as needed */}
    </div>
  );
}
