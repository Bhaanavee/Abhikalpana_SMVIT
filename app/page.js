import { FaLinkedin, FaInstagram } from 'react-icons/fa'; // Import LinkedIn and Instagram icons

export default function HomePage() {
  return (
    <div style={styles.container}>
      {/* Social media icons at the top right */}
      <div style={styles.socialIcons}>
        <a href="http://www.linkedin.com/in/abhikalpana-trust" target="_blank" rel="noopener noreferrer">
          <FaLinkedin style={styles.icon} />
        </a>
        <a href="https://www.instagram.com/abhikalpanatrust?igsh=OWM0cWV5bnI3c25q" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={styles.icon} />
        </a>
      </div>

      

      <h1 style={styles.title}>Welcome to Abhikalpana</h1>
      <p style={styles.description}>
        This platform helps us maintain and view the attendance records of our volunteers.
      </p>

      {/* Add logo at the top */}
      <img src="/abhikalpanaLogo1.jpg" alt="Abhikalpana Logo" style={styles.logo} />

      <h2 style={styles.subtitle}>Volunteers</h2>
      <p style={styles.text}>View your attendance records by entering your USN.</p>
      <a href="/volunteer">
        <button style={styles.button}>Volunteer Portal</button>
      </a>

      <h2 style={styles.subtitle}>Admin</h2>
      <p style={styles.text}>Admins can sign in to update and manage volunteer attendance records.</p>
      <a href="/signin">
        <button style={styles.button}>Admin Login</button>
      </a>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Abhikalpana NGO. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#000', // Black background
    color: '#FFA500', // Vibrant color scheme
    minHeight: '100vh',
    position: 'relative',
  },
  socialIcons: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  icon: {
    color: '#FFA500', // Icon color
    fontSize: '24px',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'color 0.3s', // Smooth color transition
  },
  logo: {
    width: '200px',
    height: 'auto',
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#FDDA0D', // Bright Orange for the title
  },
  description: {
    fontSize: '18px',
    color: '#DDD', // Lighter, warm color for description
    marginBottom: '40px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#FDDA0D', // Orange subtitles
  },
  text: {
    fontSize: '16px',
    color: '#ddd', // Light grey for text
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#2C2C2C', 
    color: '#ddd', 
    border: '2px solid #2C2C2C', 
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s', // Smooth transition effect
    marginBottom: '30px',
    textTransform: 'uppercase', // Uppercase text for buttons
    fontWeight: 'bold', // Bold text
  },
  buttonHover: {
    backgroundColor: '#FFD700', // Filled orange background on hover
    color: '#000', // Black text on hover
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    backgroundColor: '#000', // Dark footer background
    color: '#ddd', // Footer text color
    textAlign: 'center',
    padding: '0 0',
  },
};

// Apply hover styles with inline event handlers for button hover effects
const buttonStyle = (hover) => ({
  ...styles.button,
  ...(hover ? styles.buttonHover : {}),
});
