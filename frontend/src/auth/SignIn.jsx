import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/auth/signin",
				{
					email: email,
					password: password,
				}
			);
			const data = response.data;
			if (response.status === 200) {
				setIsLoggedIn(true);
				localStorage.setItem("token", data.accessToken);
			} else {
				setError(data.msg);
				console.log("Login failed", data.msg);
			}
		} catch (error) {
			console.error("Error logging in:", error);
			setError("An error occurred while logging in");
		}
	};

	return (
		<div>
			{!isLoggedIn ? (
				<div className="signin">
					<p>Please sign in to continue.</p>
					<form onSubmit={handleSignIn}>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div>
							<button className="submit-button" type="submit">
								Sign In
							</button>
						</div>
						<p>
							<Link to="/">
								<FontAwesomeIcon className="back-icon" icon={faBackward} />
							</Link>
							Not admin? Return <Link to="/">home</Link>
						</p>
					</form>
					{error && <p>{error}</p>}
				</div>
			) : (
				<Navigate to="/admin" />
			)}
		</div>
	);
}

export default SignIn;
