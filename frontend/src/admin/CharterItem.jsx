import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate, formatYear } from "../common/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faX,
	faPenToSquare,
	faCheck,
	faCamera,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

function CharterItem({ charter, onUpdateCharter, onDeleteCharter }) {
	const [charters, setCharters] = useState([]);
	const [selectedCharter, setSelectedCharter] = useState("");
	const [image, setImage] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [updatedCharter, setUpdatedCharter] = useState({ ...charter });

    // Fetch Commanders Below
	// useEffect(() => {
	// 	const fetchCharters = async () => {
	// 		try {
	// 			const res = await axios.get("http://localhost:5000/api/charters");
    //             console.log(res)
	// 			setCharters(res.data.charters);
	// 		} catch (error) {
	// 			console.error("Error fetching charters: ", error);
	// 		}
	// 	};

	// 	fetchCharters();
	// }, []);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = (e) => {
		setSelectedCharter("");
        // Reset selected commanders for charter to what is in the database 

		// setUpdatedCharter((prev) => ({
		// 	...prev,
		// 	charters: prev.charters.filter(
		// 		(charter) => charter._id !== selectedCharter
		// 	),
		// 	name: charter.name,
		// 	dateIssued: charter.dateIssued,
		// 	image: charter.charterimage
		// }));
		setIsEditing(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedCharter((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return; 
	
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

	const updateCharter = async () => {
		try {
			const updatedCharterWithImage = { ...updatedCharter, image };
			await onUpdateCharter(updatedCharterWithImage);			
			setIsEditing(false);
		} catch (err) {
			console.error("Charter not updated", err);
		}
	};
	
	const handleDeleteClick = (e) => {
		e.preventDefault()
		onDeleteCharter(charter._id);
		setIsEditing(false)
	  };

	return (
		<tr>
			{isEditing ? (
				<>
					<td data-th="PostNum:">
						   <input
							type="number"
							name="postNum"
							value={updatedCharter.postNum}
							onChange={handleChange}></input> 
					</td>
					<td>
						<div className="icons">
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
                    <td data-th="Commanders:">
                    {/* Map through commanders options, select, plus/minus for add or delete */}
                    <select>
                        <option>Commander 1</option>
                        <option>Commander 2</option>
                    </select>
					</td>
					<td data-th="Date Issued:">
						<input
							type="date"
							name="dateIssued"
							id="date-start"
							onChange={handleChange}></input>
					</td>
				</>
			) : (
				<>
					<td data-th="PostNum:">
                        {/* Charter post number */}
                    </td>
					<td data-th="Commanders:">
                        {/* Commanders assigned to charter */}
                    </td>
					<td></td>
					<td data-th="Date Issued:">
                     {`${formatYear(
					charter.dateIssued
					)}`} 
                    </td>
				</>
			)}

			<td>
				{isEditing ? (
					<div className="icons">
						<span>
							<FontAwesomeIcon
								icon={faCheck}
								onClick={updateCharter}
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

export default CharterItem;
