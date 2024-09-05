export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Abhikalpana NGO Attendance System</h1>
      <p style={styles.description}>
        This platform helps us maintain and view the attendance records of our volunteers.
      </p>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Volunteers</h2>
        <p style={styles.text}>
          View your attendance records by entering your USN.
        </p>
        <a href="/volunteer">
          <button style={styles.button}>Volunteer Portal</button>
        </a>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Admin</h2>
        <p style={styles.text}>
          Admins can sign in to update and manage volunteer attendance records.
        </p>
        <a href="/signin">
          <button style={styles.button}>Admin Login</button>
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
  },
  section: {
    margin: '20px 0',
  },
  subtitle: {
    fontSize: '24px',
    color: '#4C9085',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4C9085',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
