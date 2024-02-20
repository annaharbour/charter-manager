import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				setIsLoggedIn(true);
				localStorage.setItem("token", data.accessToken);
				console.log("Successfully logged in");
			} else {
				setError(data.msg);
				console.log('Login failed', data.msg)
			}
		} catch (error) {
			console.error("Error logging in:", error);
			setError("An error occurred while logging in");
		}
	};

	return (
		<>
			{isLoggedIn ? (
				<div className="admin-links">
					<Link to="/Home">Home</Link>
					<Link to="/CharterList">CharterList</Link>
					<Link to="/CommanderList">CommanderList</Link>
					<Link to="/UserList">UserList</Link>
				</div>
			) : (
				<div>
					<p>Please sign in to continue.</p>
					<form onSubmit={handleSignIn}>
						<label htmlFor="username">Username:</label>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required></input>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button className="submit-button" type="submit">
							Sign In
						</button>
					</form>

					{error && <p>{error}</p>}
				</div>
			)}
		</>
	);
}

export default SignIn;
