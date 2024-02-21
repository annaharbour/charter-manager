import React, { useState } from "react";

function Admin() {
	const [error, setError] = useState("");

	const handleLogout = async () => {
		try {
			await fetch("http://localhost:5000/auth/signout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			localStorage.removeItem("token");
			window.location.reload(); 

		} catch (error) {
			console.error("Error logging out:", error);
			setError("An error occurred while logging out");
		}
	};

	return (
		<>
			{error ? error : (
       <p>Success</p>
      )}
				<button onClick={handleLogout}>Logout</button>
        
		</>
	);
}

export default Admin;

// Login -> render form --> render SignIn form --> redirect to home
// Do you not have an account? --> Register -> render SignUp form --> redirect to home
// Home will include admin navigation
