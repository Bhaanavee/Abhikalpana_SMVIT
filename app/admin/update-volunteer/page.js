'use client';

import { useRouter } from 'next/navigation'; // For navigation
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function UpdateVolunteer() {
  const router = useRouter();
  const [usn, setUsn] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const [attended, setAttended] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAttendanceUpdate = async () => {
    if (!usn || !hours || !date) {
      setError('All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, "attendance"), {
        usn: usn,
        date: new Date(date),
        attended: attended,
        hours: Number(hours),
      });
      setMessage('Attendance record updated successfully.');
      setError('');
    } catch (e) {
      setError('Error updating record. Please try again.');
      console.error("Error updating record: ", e);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#000000', color: '#FFA500' }}>
      <button
        onClick={handleBack}
        style={{ padding: '10px', backgroundColor: '#2C2C2C', color: '#FFA500', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Back
      </button>
      <br></br>
      <h1>Update Volunteer Record</h1>
      <br></br>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAttendanceUpdate();
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <label>
          Volunteer USN:
          <input
            type="text"
            placeholder="Enter USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #2C2C2C', backgroundColor: '#2C2C2C', color: '#FFA500' }}
          />
        </label>
        <br></br>
        <label>
          Hours Worked:
          <input
            type="number"
            placeholder="Enter hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #2C2C2C', backgroundColor: '#2C2C2C', color: '#FFA500' }}
          />
        </label>

        <br></br>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #2C2C2C', backgroundColor: '#2C2C2C', color: '#FFA500' }}
          />
        </label>
        <br></br>
        <label>
          Attended:
          <input
            type="checkbox"
            checked={attended}
            onChange={(e) => setAttended(e.target.checked)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <br></br>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#FFA500', color: '#000000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Update Attendance
        </button>
      </form>
      {message && <p style={{ color: '#00FF00' }}>{message}</p>}
      {error && <p style={{ color: '#FF0000' }}>{error}</p>}
    </div>
  );
}
