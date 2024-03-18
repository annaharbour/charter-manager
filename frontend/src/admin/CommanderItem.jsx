import React, { useState, useEffect } from "react";
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
import { addImage } from "../services/commonService";
import { getCharters } from "../services/chartersService";

function CommanderItem({ commander, onUpdateCommander, onDeleteCommander }) {
	const [isDeceased, setIsDeceased] = useState(commander.isDeceased);
	const [charters, setCharters] = useState([]);
	const [selectedCharter, setSelectedCharter] = useState("");
	const [image, setImage] = useState(commander.image);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedCommander, setUpdatedCommander] = useState({ ...commander });

	useEffect(() => {
		const fetchCharters = async () => {
			try {
				const res = await getCharters();
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
			dateStart: commander.dateStart,
			dateEnd: commander.dateEnd,
			image: commander.image,
		}));
		setIsEditing(false);
	};

	const handleChange = (e) => {
		e.preventDefault()
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

	const handleFileChange = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		try {
			const formData = new FormData();
			formData.append("image", file);
			console.log(formData);
			const uploadResponse = await addImage(formData);
			console.log(uploadResponse);
			const uploadedImageUrl = uploadResponse.data.image;
			setImage(uploadedImageUrl);
		} catch (err) {
			console.error(err?.response?.data?.message || err.message);
		}
	};

	const onStarClick = () => {
		setIsDeceased(!isDeceased);
	};

	const updateCommander = async () => {
		try {
			const updatedCommanderWithImage = {
				...updatedCommander,
				image,
				isDeceased,
			};
			await onUpdateCommander(updatedCommanderWithImage);
			setIsDeceased(isDeceased);
			setIsEditing(false);
		} catch (err) {
			console.error("Commander not updated", err);
		}
	};

	const handleDeleteClick = (e) => {
		e.preventDefault();
		onDeleteCommander(commander._id);
		setIsEditing(false);
	};

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

					<td className="charters-edit" data-th="Charters:">
						{updatedCommander.charters.map((charter) => (
							<li key={charter._id}>
								{charter.postNum}
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
											{charter.postNum}
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
					<td data-th="Charters:">
						{commander.charters.map((charter) => (
							<li key={charter._id}>{charter.postNum}</li>
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
								onClick={handleDeleteClick}
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
