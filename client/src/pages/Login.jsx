import React, { useState , useEffect } from 'react';

function LoginPage() { 
  const [loggedIn, setLoggedIn] = useState(false);

 const handleLogin = () =>
{    setLoggedIn(true);
    window.location.href = "https://backend-w6vj.onrender.com/auth/google";
};

  const styles = {
    loginContainer: {
      textAlign: 'center',
      marginTop: '100px',
      fontFamily: 'Arial, sans-serif',
      width: '100vw',
      height: '100vh',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    h1: {
      color: '#333',
    },
    loginButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <button 
        type="button" 
        style={styles.loginButton}
        onClick={handleLogin} 
        Sign in with Google>
      </button>
    </div>
  );
}

export default LoginPage;
