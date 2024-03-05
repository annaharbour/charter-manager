import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faX,
	faPenToSquare,
	faPlus,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../common/formatDate";

// Mobile still needs work with alignment. Intention is for inputs to appear when admin clicks the edit button faPenToSquare, changes to database committed when admin clicks faCheck. The star indicates that the commander is deceased. This functionality and style can be reused in the CharterList component. You may want to strip the functionality out into its own component to simplify CharterList and CommanderList, but it's easier to make individual changes in the future if you keep them separate. May want to change the date format on mobile to MM-DD-YYYY to save room as well.

function CommanderList() {
	const [commanders, setCommanders] = useState([]);
	const [isEditing, setIsEditing] = useState(true);

	useEffect(() => {
		const fetchCommanders = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/commanders");
				const data = await response.json();
				setCommanders(data.commanders);
			} catch (error) {
				console.error("Error fetching charters: ", error);
			}
		};

		fetchCommanders();
	}, []);

	function updateCommander(e) {
		e.preventDefault();
		setIsEditing(false);
	}

	function deleteCommander(e) {
		e.preventDefault();
		setIsEditing(false);
	}

	return (
		<div>
			<table className="rwd-table">
				<thead>
					<tr>
						<th>Commander Name</th>
						<th>Post Number</th>
						<th>Service</th>
						<th>Charters</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{commanders.map((commander) => (
						<tr key={commander._id}>
							<td data-th="Commander Name">
								{commander.isDeceased ? <FontAwesomeIcon icon={faStar} /> : ""}{" "}
								{commander.name}
							</td>
							<td data-th="Post #">{commander.postNum}</td>
							<td data-th="Service">{`${formatDate(
								commander.dateStart
							)}- ${formatDate(commander.dateEnd)}`}</td>

							<td data-th="Charters">
								{commander.charters.map((charter) => (
									<li key={charter._id}>{charter.charter}</li>
								))}
							</td>
							<td>
								{isEditing ? (
									<div className="icons">
										<FontAwesomeIcon icon={faCheck} onClick={updateCommander} />
										<FontAwesomeIcon
											className="delete"
											icon={faX}
											onClick={deleteCommander}
										/>
									</div>
								) : (
									<div className="icons">
										<FontAwesomeIcon icon={faPenToSquare} />
									</div>
								)}
							</td>
						</tr>
					))}
					<tr>
						<td>
							Add Commander <FontAwesomeIcon icon={faPlus} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default CommanderList;
