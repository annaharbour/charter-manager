import React, { useState , useEffect} from "react";
import { formatDate } from "../common/formatDate";
import {formatYear} from '../common/formatDate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faX,
	faPenToSquare,
	faCheck,
	faMinus,
	faPlus
} from "@fortawesome/free-solid-svg-icons";



function CommanderItem({ commander, onUpdateCommander }) {
	const [charters, setCharters] = useState([])
	const [isEditing, setIsEditing] = useState(false);
	const [updatedCommander, setUpdatedCommander] = useState({ ...commander });

	useEffect(() => {
		const fetchCharters = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/charters");
				const data = await response.json();
				setCharters(data.charters);
			} catch (error) {
				console.error("Error fetching charters: ", error);
			}
		};
	
		fetchCharters();
	}, []);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedCommander((prev) => ({ ...prev, [name]: value }));
	};

	function updateCommander(e) {
		onUpdateCommander(updatedCommander);
		setIsEditing(false);
	}

	function deleteCommander(e) {
		e.preventDefault();
		setIsEditing(false);
	}

	return (
		<tr>
			{isEditing ? (
				<>
					<td data-th="Commander Name:">
						
						<input
							type="text"
							name="name"
							value={updatedCommander.name}
							onChange={handleChange}></input>
					</td>
						
					<td data-th="Post Number:">
						<input
							type="number"
							name="postNum"
							value={updatedCommander.postNum}
							onChange={handleChange}></input>
					</td>
					<td data-th="Service:">
					<input
							type="text"
							onChange={handleChange}
							value={`${formatDate(
								commander.dateStart
							)}`}
						/>
						-
						<input
							type="text"
							onChange={handleChange}
							value={`${formatDate(
								commander.dateEnd
							)}`}
						/>
					</td>
					<td data-th="Charters">
						{commander.charters.map((charter) => (
							
							<li key={charter._id}>
								{/* TODO: Remove Charter Function */}
								<FontAwesomeIcon className="icon faMinus" onClick={() => {}} icon={faMinus} style={{color: 'red'}}/>
								{formatYear(charter.dateIssued)}
							</li>
						))}
						<select name="charter" id="charter-select">
							{charters.map((charter) =>
							<option key={charter.dateIssued}>{formatYear(charter.dateIssued)}</option>
							 )}
							
						</select>
						{/* TODO: Assign Commander Charter Function */}
						<FontAwesomeIcon icon={faPlus} style={{color: 'black'}}/>
					</td>
				</>
			) : (
				<>
					<td data-th="Commander Name:">
						{commander.isDeceased ? <FontAwesomeIcon icon={faStar} /> : ""}{" "}
						{commander.name}
					</td>
					<td data-th="Post Number:">{commander.postNum}</td>
					<td data-th="Service:">{`${formatDate(
						commander.dateStart
					)}- ${formatDate(commander.dateEnd)}`}</td>
					<td data-th="Charters:">
						{commander.charters.map((charter) => (
							<li key={charter._id}>{charter.charter}</li>
						))}
					</td>
				</>
			)}

			<td>
				{isEditing ? (
					<div className="icons">
						<FontAwesomeIcon icon={faCheck} onClick={updateCommander}  style={{color: 'black'}}/>
						<FontAwesomeIcon
							className="delete"
							icon={faX}
							onClick={deleteCommander}
						/>
					</div>
				) : (
					<div className="icons">
						<FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
					</div>
				)}
			</td>
		</tr>
	);
}

export default CommanderItem;
