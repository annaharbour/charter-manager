import React, {useState} from 'react'

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('An error occurred while logging out');
    }
  };

  return (
    <>
    {error ? <p>{error} </p> : (
      <div>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
        Link back to home
        </>
      )}
    </div>
    )}
    </>
  )
}

export default Admin

// Login -> render form --> render SignIn form --> redirect to home
// Do you not have an account? --> Register -> render SignUp form --> redirect to home
// Home will include admin navigation