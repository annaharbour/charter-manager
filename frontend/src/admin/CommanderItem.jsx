import React, { useState, useEffect } from "react";
import axios from 'axios'
import { formatDate, formatYear } from "../common/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faX,
	faPenToSquare,
	faCheck,
	faMinus,
	faPlus,
	faCamera,
	faTrash
} from "@fortawesome/free-solid-svg-icons";

function CommanderItem({ commander, onUpdateCommander }) {
	const [charters, setCharters] = useState([]);
	
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

	const updateCommander = async () => {
        try {
            await onUpdateCommander(updatedCommander);
            setIsEditing(false);
        } catch(err) {
            console.error('Commander not updated', err);
        }
    }

	function deleteCommander(e) {
		e.preventDefault();
		setIsEditing(false);
	}

	return (
		<tr>
			{isEditing ? (
				<>
					<td data-th="Name:">
						<input
							type="text"
							name="name"
							value={updatedCommander.name}
							onChange={handleChange}></input>
					</td>
					<td>
						<div className="icons">
							{/* TODO: Toggle commander isDeceased value, set star to gold if deceased, white if not*/}
							<span>
								<FontAwesomeIcon
									icon={faStar}
									style={{ color: "#ffffff" }}
									onClick={() => {}}
								/>
							</span>
							<span>
								{/* TODO: Image upload / preview for commander  */}
								<FontAwesomeIcon style={{ color: "#ffffff" }} icon={faCamera} />
							</span>
						</div>
					</td>
					<td data-th="Post Number:">
						<input
							type="text"
							name="postNum"
							value={updatedCommander.postNum}
							onChange={handleChange}></input>
					</td>
					<td className="charters-edit" data-th="Charters:">
						{commander.charters.map((charter) => (
							<li key={charter._id}>
								{/* TODO: Remove Charter Assignment Function */}
								{formatYear(charter.dateIssued)}
								<FontAwesomeIcon
									className="icon faMinus"
									onClick={() => {}}
									icon={faMinus}
									style={{ color: "red" }}
								/>
							</li>
						))}
						<div>
							<select name="charter" id="charter-select">
								{charters.map((charter) => (
									<option key={charter.dateIssued}>
										{formatYear(charter.dateIssued)}
									</option>
								))}
							</select>
							{/* TODO: Assign Commander Charter Function */}
							<FontAwesomeIcon
								icon={faPlus}
								className="faPlus"
								style={{ color: "black" }}
							/>
						</div>
					</td>
					<td data-th="Service Start:">
						<input
							type="date"
							name="dateStart"
							id="date-start"
							value={updatedCommander.dateStart}
							onChange={handleChange}></input>
					</td>
					<td data-th="Service End:">
						<input
							type="date"
							name="dateEnd"
							id="date-end"
							value={updatedCommander.dateEnd}
							onChange={handleChange}></input>
					</td>
				</>
			) : (
				<>
					<td data-th="Commander Name:">{commander.name}</td>

					{commander.isDeceased ? (
						<td>
							<FontAwesomeIcon style={{ color: "#a79055" }} icon={faStar} />{" "}
						</td>
					) : (
						<td></td>
					)}
					<td data-th="Post Number:">{commander.postNum}</td>
					<td data-th="Charters:">
						{commander.charters.map((charter) => (
							<li key={charter._id}>{formatYear(charter.dateIssued)}</li>
						))}
					</td>
					<td data-th="Service Start:">{`${formatDate(
						commander.dateStart
					)}`}</td>
					<td data-th="Service End:">{`${formatDate(commander.dateEnd)}`}</td>
				</>
			)}

			<td>
				{isEditing ? (
					<div className="icons">
						<span>
							<FontAwesomeIcon
								icon={faCheck}
								onClick={updateCommander}
								style={{ color: "black" }}
							/>
						</span>
						<span>
							<FontAwesomeIcon
								icon={faX}
								style={{ color: "black" }}
								onClick={() => setIsEditing(!isEditing)}
							/>
						</span>
						<span>
							<FontAwesomeIcon
								style={{ color: "#991a1e" }}
								icon={faTrash}
								onClick={deleteCommander}
							/>
						</span>
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
