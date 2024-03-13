import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBackward,
	faCaretDown,
	faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import CommanderList from "./CommanderList";
import CharterList from "./CharterList";

function Admin() {
	const [error, setError] = useState("");
	const [toggleCommanders, setToggleCommanders] = useState(false);
	const [toggleCharters, setToggleCharters] = useState(false);

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

	function onToggleCommandersClick() {
		setToggleCommanders(!toggleCommanders);
	}

	function onToggleChartersClick() {
		setToggleCharters(!toggleCharters);
	}

	return (
		<div className="admin">
			{error ? (
				error
			) : (
				<div className="admin-actions">
					<div
						className="admin-action-dropdown"
						onClick={onToggleCommandersClick}>
						Manage Commanders
						<FontAwesomeIcon
							className="back-icon"
							icon={toggleCommanders ? faCaretUp : faCaretDown}
						/>
					</div>
					{toggleCommanders ? (
						<div className="commanders-admin">
							<CommanderList />
						</div>
					) : (
						""
					)}
					<div
						className="admin-action-dropdown"
						onClick={onToggleChartersClick}>
						Manage Charters
						<FontAwesomeIcon
							className="back-icon"
							icon={toggleCharters ? faCaretUp : faCaretDown}
						/>
					</div>
					{toggleCharters ? (
						<div className="commanders-charters">
							<CharterList/>
						</div>
					) : (
						""
					)}
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
