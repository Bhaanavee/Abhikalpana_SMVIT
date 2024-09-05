'use client';  // Ensure this is a Client Component

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';  // Import initialized Firebase app

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');  // Redirect to admin dashboard after successful login
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  const containerStyle = {
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#000000', // Black background
    color: '#FFA500', // Text color
    height: '100vh',
  };

  const inputStyle = {
    padding: '10px',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '10px',
    backgroundColor: '#2C2C2C',
    border: 'none',
    color: '#FFA500',
    borderRadius: '5px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#FFA500',
    color: '#2C2C2C',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  const imageStyle = {
    width: '150px', // Adjust the width of the image
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%', // To make it circular
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Add a photo before the sign-in form */}
      <img
        src="./assets/abhikalpanaLogo2.jpg" // Update the image path accordingly
        alt="Admin Login"
        style={imageStyle}
      />
      <h1>Admin Sign In</h1>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
      </form>
    </div>
  );
}
