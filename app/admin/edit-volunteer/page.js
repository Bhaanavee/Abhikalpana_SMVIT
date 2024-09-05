'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore';

export default function EditVolunteer() {
  const router = useRouter();
  const [usn, setUsn] = useState('');
  const [name, setName] = useState('');
  const [action, setAction] = useState('add'); // 'add' or 'delete'
  const [message, setMessage] = useState(''); // For success message
  const [error, setError] = useState(''); // For error message
  const [volunteers, setVolunteers] = useState([]); // For storing volunteers

  useEffect(() => {
    // Set up real-time listener for volunteer updates
    const unsubscribe = onSnapshot(collection(db, "volunteers"), (snapshot) => {
      const vols = [];
      snapshot.forEach((doc) => {
        vols.push(doc.data());
      });
      setVolunteers(vols);
    }, (error) => {
      console.error("Error fetching volunteers: ", error);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleAddVolunteer = async () => {
    try {
      await addDoc(collection(db, "volunteers"), {
        usn: usn,
        name: name,
      });
      setMessage('Volunteer added successfully.');
      setError('');
    } catch (e) {
      setError('Error adding volunteer. Please try again.');
      console.error("Error adding volunteer: ", e);
    }
  };

  const handleDeleteVolunteer = async () => {
    if (!usn) {
      setError('USN is required to delete a volunteer.');
      return;
    }

    try {
      // Locate the volunteer document by USN
      const volunteerQuery = query(collection(db, "volunteers"), where("usn", "==", usn));
      const querySnapshot = await getDocs(volunteerQuery);

      if (querySnapshot.empty) {
        setError('Volunteer with the specified USN does not exist.');
        return;
      }

      // Delete each document found with the specified USN
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setMessage('Volunteer deleted successfully.');
      setError('');
    } catch (e) {
      setError('Error deleting volunteer. Please try again.');
      console.error("Error deleting volunteer: ", e);
    }
  };

  const handleAction = () => {
    if (action === 'add') {
      handleAddVolunteer();
    } else if (action === 'delete') {
      handleDeleteVolunteer();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAction();
    }
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#000000', // Black background
    color: '#FDDA0D', // Text color
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#2C2C2C', // Button background
    color: '#FDDA0D', // Button text color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #2C2C2C',
    backgroundColor: '#2C2C2C',
    color: '#FDDA0D',
    marginBottom: '10px',
    width: '100%',
  };

  const selectStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #2C2C2C',
    backgroundColor: '#2C2C2C',
    color: '#FFA500',
    marginBottom: '10px',
    width: '100%',
  };

  const messageStyle = {
    color: 'green',
    margin: '10px 0',
  };

  const errorStyle = {
    color: 'red',
    margin: '10px 0',
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
      <h1>Edit Volunteer Credentials</h1>
      <br></br>
      <select value={action} onChange={(e) => setAction(e.target.value)} style={selectStyle}>
        <option value="add">Add Volunteer</option>
        <option value="delete">Delete Volunteer</option>
      </select>
      <br></br>
      <input
        type="text"
        placeholder="Volunteer USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        onKeyDown={handleKeyDown}
        style={inputStyle}
      />
      {action === 'add' && (
        <input
          type="text"
          placeholder="Volunteer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />
      )}
      <br></br>
      <button
        onClick={handleAction}
        style={buttonStyle}
      >
        {action === 'add' ? 'Add Volunteer' : 'Delete Volunteer'}
      </button>
      <br></br>
      {message && <p style={messageStyle}>{message}</p>}
      <br></br>
      {error && <p style={errorStyle}>{error}</p>}
      <br></br>
      <h2>Current Volunteers</h2>
      
      {volunteers.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0', color: '#FDDA0D' }}>
          {volunteers.map((volunteer, index) => (

            <li key={index} style={{ marginBottom: '10px' }}>
              <br></br>
              USN: {volunteer.usn} - Name: {volunteer.name}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#DDD' }}>No volunteers found.</p>
      )}
    </div>
  );
}
