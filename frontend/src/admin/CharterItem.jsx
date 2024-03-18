import React, { useState } from "react";
import { addImage } from "../services/commonService";
import { formatDate } from "../common/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faX,
	faPenToSquare,
	faCheck,
	faCamera,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

function CharterItem({ charter, onUpdateCharter, onDeleteCharter }) {
	const [image, setImage] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [updatedCharter, setUpdatedCharter] = useState({ ...charter });

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = (e) => {
		setUpdatedCharter((prev) => ({
			...prev,
			dateIssued: charter.dateIssued,
			image: charter.charterImage,
		}));
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
			formData.append("image", file);
			const uploadResponse = await addImage(formData);
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
		e.preventDefault();
		onDeleteCharter(charter._id);
		setIsEditing(false);
	};

	return (
		<tr>
			{isEditing ? (
				<>
					<td data-th="PostNum:">
						<input
							type="number"
							name="postNum"
							value={updatedCharter.postNum || ""}
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

					<td data-th="Date Issued:">
						<input
							type="date"
							value={updatedCharter.dateIssued}
							name="dateIssued"
							id="date-start"
							onChange={handleChange}></input>
					</td>
				</>
			) : (
				<>
					<td data-th="PostNum:">{updatedCharter.postNum}</td>

					<td></td>
					<td data-th="Date Issued:">{formatDate(charter.dateIssued)}</td>
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
