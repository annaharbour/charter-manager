import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBackward,
	faCaretDown,
	faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

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
		<div className="admin">
			{error ? (
				error
			) : (
				<div className="admin-actions">
					<div className="admin-action-dropdown">
						Manage Commanders
						<FontAwesomeIcon className="back-icon" icon={faCaretDown} />
					</div>

					<div className="admin-action-dropdown">
						Manage Charters
						<FontAwesomeIcon className="back-icon" icon={faCaretDown} />
					</div>
				</div>
			)}
			<button onClick={handleLogout}>Logout</button>
			<p>
				<Link to="/">
					<FontAwesomeIcon className="back-icon" icon={faBackward} />
				</Link>{" "}
				Navigate to <Link to="/">home</Link>
			</p>
		</div>
	);
}

export default Admin;

// Login -> render form --> render SignIn form --> redirect to home
// Do you not have an account? --> Register -> render SignUp form --> redirect to home
// Home will include admin navigation
