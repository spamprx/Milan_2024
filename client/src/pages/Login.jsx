import React, { useState } from 'react';

function LoginPage() { 
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    window.location.href = "https://backend-w6vj.onrender.com/auth/google";
  };

  const styles = {
    loginContainer: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      width: '100vw',
      height: '100vh',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",// Deep purple background
    },
    loginButton: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      padding: '10px 16px',
      fontSize: '14px',
      border: '1px solid #DADCE0',
      borderRadius: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '500',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    },
    googleLogo: {
      marginRight: '10px',
      width: '18px',
      height: '18px',
    }
  };

  return (
    <div style={styles.loginContainer}>
      <button 
        type="button" 
        style={styles.loginButton}
        onClick={handleLogin}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
          alt="Google logo" 
          style={styles.googleLogo}
        />
        Continue with Google
      </button>
    </div>
  );
}

export default LoginPage;