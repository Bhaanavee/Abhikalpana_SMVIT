'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import { db } from '../../firebase';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { FaUsers, FaArrowLeft } from 'react-icons/fa'; // Icons

export default function ViewVolunteers() {
  const router = useRouter();
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // Fetch volunteers
        const volsQuery = query(collection(db, 'volunteers'));
        const volsSnapshot = await getDocs(volsQuery);
        const volsData = volsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch attendance data for each volunteer
        const updatedVolunteers = await Promise.all(volsData.map(async (volunteer) => {
          const attQuery = query(collection(db, 'attendance'), where('usn', '==', volunteer.usn));
          const attSnapshot = await getDocs(attQuery);
          
          let totalDays = 0;
          let totalHours = 0;

          attSnapshot.forEach((doc) => {
            const data = doc.data();
            totalDays += 1;
            totalHours += data.hours; // Assuming the document has an `hours` field
          });

          return {
            ...volunteer,
            totalDays,
            totalHours,
          };
        }));

        setVolunteers(updatedVolunteers);
        setFilteredVolunteers(updatedVolunteers);
      } catch (e) {
        setError('Error fetching volunteers or attendance data. Please try again.');
        console.error('Error fetching data:', e);
      }
    };

    fetchVolunteers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const lowerCaseTerm = e.target.value.toLowerCase();
    const filtered = volunteers.filter(volunteer => 
      volunteer.usn.toLowerCase().includes(lowerCaseTerm) || 
      volunteer.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredVolunteers(filtered);
  };

  const handleBack = () => {
    router.back();
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#000000', // Black background
    color: '#FDDA0D', // Text color
  };

  const headerStyle = {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const backButtonStyle = {
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
    marginBottom: '20px',
  };

  const searchInputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #2C2C2C',
    backgroundColor: '#2C2C2C',
    color: '#FDDA0D',
    marginBottom: '20px',
    width: '100%',
  };

  const errorStyle = {
    color: '#FF0000',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #FDDA0D',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={handleBack}
        style={backButtonStyle}
      >
        <FaArrowLeft size={24} />
        Back
      </button>
      <header style={headerStyle}>
        <FaUsers size={24} />
        <h1>View Volunteers</h1>
      </header>
      <input
        type="text"
        placeholder="Search by USN or Name"
        value={searchTerm}
        onChange={handleSearch}
        style={searchInputStyle}
      />
      {error && <p style={errorStyle}>{error}</p>}
      <ul style={listStyle}>
        {filteredVolunteers.length > 0 ? (
          filteredVolunteers.map((volunteer) => (
            <li key={volunteer.id} style={listItemStyle}>
              <strong>USN:</strong> {volunteer.usn} <br />
              <strong>Name:</strong> {volunteer.name} <br />
              <strong>Total Days Attended:</strong> {volunteer.totalDays} <br />
              <strong>Total Hours Attended:</strong> {volunteer.totalHours}
            </li>
          ))
        ) : (
          <p>No volunteers found.</p>
        )}
      </ul>
    </div>
  );
}
