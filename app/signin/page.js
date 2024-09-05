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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn(e);  // Trigger sign-in on pressing Enter
    }
  };

  const handleBack = () => {
    router.back();  // Navigate to the previous page
  };

  const containerStyle = {
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#000000', // Black background
    color: '#FDDA0D', // Text color
    height: '100vh',
  };

  const inputStyle = {
    padding: '10px',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '10px',
    backgroundColor: '#2C2C2C',
    border: 'none',
    color: '#FDDA0D',
    borderRadius: '5px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#FDDA0D',
    color: '#2C2C2C',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  };

  const backButtonStyle = {
    ...buttonStyle,  // Same styling as the other buttons
    marginRight: '0px',  // Space between buttons
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  const imageStyle = {
    width: '550px', // Adjust the width of the image
    height: '150px',
    objectFit: 'cover',
    borderRadius: '0%', // Rectangular shape
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Add a photo before the sign-in form */}
      <img
        src="/abhikalpanaLogo2.jpg" // Update the image path accordingly
        alt="Admin Login"
        style={imageStyle}
      />
      <br></br>
      <h1>Admin Sign In</h1>
      <br></br>
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
            onKeyDown={handleKeyPress}  // Add keypress event listener for "Enter"
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
            onKeyDown={handleKeyPress}  // Add keypress event listener for "Enter"
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
        <br></br>
        <button type="button" onClick={handleBack} style={backButtonStyle}>
          Back
        </button>
      </form>
    </div>
  );
}
