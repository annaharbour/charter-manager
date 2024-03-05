import React, { useState } from "react";
import { formatDate } from "../common/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faX,
	faPenToSquare,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";

function CommanderItem({ commander }) {
	const [isEditing, setIsEditing] = useState(false);

	function updateCommander(e) {
		e.preventDefault();
		setIsEditing(false);
	}

	function deleteCommander(e) {
		e.preventDefault();
		setIsEditing(false);
	}

	return (
		<tr>
			<td data-th="Commander Name">
				{commander.isDeceased ? <FontAwesomeIcon icon={faStar} /> : ""}{" "}
				{commander.name}
			</td>
			<td data-th="Post #">{commander.postNum}</td>
			<td data-th="Service">{`${formatDate(commander.dateStart)}- ${formatDate(
				commander.dateEnd
			)}`}</td>
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
			<div className="line"></div>
		</tr>
	);
}

export default CommanderItem;
