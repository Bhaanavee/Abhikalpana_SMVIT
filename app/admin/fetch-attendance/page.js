'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function FetchAttendance() {
  const router = useRouter();
  const [usn, setUsn] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchAttendance = async () => {
    setIsFetching(true);
    try {
      const q = query(collection(db, "attendance"), where("usn", "==", usn));
      const querySnapshot = await getDocs(q);
      const records = [];
      let hoursWorked = 0;
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        records.push(data);
        if (data.attended) {
          hoursWorked += data.hours;
        }
      });

      setAttendance(records);
      setTotalDays(records.length);
      setTotalHours(hoursWorked);
    } catch (e) {
      console.error("Error fetching attendance: ", e);
    } finally {
      setIsFetching(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchAttendance();
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: isFetching ? '#FFC107' : '#FFA500', // Change color when fetching
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#000000', color: '#FFA500' }}>
      <button
        onClick={handleBack}
        style={{ padding: '10px', backgroundColor: '#2C2C2C', color: '#FFA500', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Back
      </button>
      <br />
      <h1>Fetch Attendance</h1>
      <br />
      <input
        type="text"
        placeholder="Volunteer USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #2C2C2C', backgroundColor: '#2C2C2C', color: '#FFA500', marginBottom: '10px' }}
      />
      <br />
      <button
        onClick={fetchAttendance}
        style={buttonStyle}
      >
        {isFetching ? 'Fetching...' : 'Fetch Attendance'}
      </button>
      <br />

      <h3>Total Days: {totalDays}</h3>
      <br />
      <h3>Total Hours: {totalHours}</h3>
      <br />

      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {attendance.map((record, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <br />
            {record.usn} - {record.attended ? 'Present' : 'Absent'} on {record.date.toDate().toLocaleDateString()} ({record.hours} hours)
          </li>
        ))}
      </ul>
    </div>
  );
}
