import React, { useState, useEffect } from "react";
import axios from "axios";
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
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

function CommanderItem({ commander, onUpdateCommander }) {
	const [isDeceased, setIsDeceased] = useState(commander.isDeceased);
	const [charters, setCharters] = useState([]);
	const [selectedCharter, setSelectedCharter] = useState("");
	const [image, setImage] = useState(commander.image);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedCommander, setUpdatedCommander] = useState({ ...commander });

	useEffect(() => {
		const fetchCharters = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/charters");
				setCharters(res.data.charters);
			} catch (error) {
				console.error("Error fetching charters: ", error);
			}
		};

		fetchCharters();
	}, []);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = (e) => {
		setSelectedCharter("");
		setUpdatedCommander((prev) => ({
			...prev,
			charters: prev.charters.filter(
				(charter) => charter._id !== selectedCharter
			),
			name: commander.name,
			postNum: commander.postNum,
			dateStart: commander.dateStart,
			dateEnd: commander.dateEnd,
			image: commander.image
		}));
		setIsEditing(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedCommander((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddCharter = (charterId) => {
		if (charterId) {
			const selectedCharter = charters.find(
				(charter) => charter._id === charterId
			);

			setUpdatedCommander((prev) => ({
				...prev,
				charters: [...prev.charters, selectedCharter],
			}));
		}
	};

	const handleRemoveCharter = (charterId) => {
		console.log(charterId);
		setUpdatedCommander((prev) => ({
			...prev,
			charters: prev.charters.filter((charter) => charter._id !== charterId),
		}));
	};
	// const handleFileChange = async (e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const file = e.target.files[0];
	// 		const formData = new FormData();
	// 		formData.append('image', file);
	// 		const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
	// 		const uploadedImageUrl = uploadResponse.data.image;
	// 		setImage(uploadedImageUrl);
	// 	} catch (err) {
	// 		console.error(err?.response?.data?.message || err.message);
	// 	}
	// };

	const handleFileChange = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return; // No file selected, do nothing
	
		try {
			const formData = new FormData();
			formData.append('image', file);
			const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			const uploadedImageUrl = uploadResponse.data.image;
			setImage(uploadedImageUrl);
		} catch (err) {
			console.error(err?.response?.data?.message || err.message);
		}
	};
	
	
	
	

	const onStarClick = () => {
		setIsDeceased(!isDeceased)
	}

	const updateCommander = async () => {
		try {
			const updatedCommanderWithImage = { ...updatedCommander, image, isDeceased };
			await onUpdateCommander(updatedCommanderWithImage);			
			setIsDeceased(isDeceased)
			setIsEditing(false);
		} catch (err) {
			console.error("Commander not updated", err);
		}
	};
	
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
									style={{ color: isDeceased ? "#a79055" : "#ffffff" }}
									value={updateCommander.isDeceased}
									onClick={onStarClick}

								/>
							</span>
							<span>
								<label htmlFor="file-input">
									<FontAwesomeIcon
										icon={faCamera}
										style={{ color: "#ffffff", cursor: "pointer" }}
									/>
								</label>
								<input
									name="image"
									id="file-input"
									type="file"
									style={{ display: "none" }}
									onChange={handleFileChange}
								/>
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
						{updatedCommander.charters.map((charter) => (
							<li key={charter._id}>
								{formatYear(charter.dateIssued)}
								<FontAwesomeIcon
									className="icon faMinus"
									onClick={() => handleRemoveCharter(charter._id)}
									icon={faMinus}
									style={{ color: "red" }}
								/>
							</li>
						))}

						<div>
							<select
								name="charter"
								id="charter-select"
								value={selectedCharter}
								onChange={(e) => setSelectedCharter(e.target.value)}>
								<option value="">Charter</option>
								{charters
									.filter(
										(charter) =>
											!updatedCommander.charters.some(
												(assignedCharter) => assignedCharter._id === charter._id
											)
									)
									.map((charter) => (
										<option key={charter._id} value={charter._id}>
											{formatYear(charter.dateIssued)}
										</option>
									))}
							</select>
							<FontAwesomeIcon
								icon={faPlus}
								className="faPlus"
								style={{ color: "black" }}
								onClick={() => handleAddCharter(selectedCharter)}
							/>
						</div>
					</td>
					<td data-th="Service Start:">
						<input
							type="date"
							name="dateStart"
							id="date-start"
							onChange={handleChange}></input>
					</td>
					<td data-th="Service End:">
						<input
							type="date"
							name="dateEnd"
							id="date-end"
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
								onClick={handleCancelClick}
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
