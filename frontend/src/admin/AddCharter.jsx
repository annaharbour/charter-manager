import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faX,
	faCheck,
	faPlus,
	faCamera,
} from "@fortawesome/free-solid-svg-icons";

function AddCharter({ isCreating, setIsCreating, addNewCharter }) {
	const [isDeceased, setIsDeceased] = useState(false);
	const [image, setImage] = useState("");
	const [newCommander, setNewCommander] = useState({
		dateIssued: "",
		charterImage: "",
	});

	const handleIsCreating = () => {
		setIsCreating(true);
	};

	const handleCancelClick = (e) => {
		setIsCreating(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewCommander((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		try {
			const formData = new FormData();
			formData.append("image", file);
			const uploadResponse = await axios.post(
				"http://localhost:5000/api/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const uploadedImageUrl = uploadResponse.data.image;
			setImage(uploadedImageUrl);
		} catch (err) {
			console.error(err?.response?.data?.message || err.message);
		}
	};

	const handleAddNewCommander = async () => {
		try {
			const newCharterWithImage = { ...newCommander, image, isDeceased };
			await addNewCharter(newCharterWithImage);
			setIsDeceased(isDeceased);
			setIsCreating(false);
		} catch (err) {
			console.error("Commander not created", err);
		}
	};

	return (
		<tr>
			{isCreating ? (
				<>
					<td data-th="Charter:">
						<input
							type="text"
							name="charterId"
							value={newCommander.charterId}
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
							name="dateIssued"
							id="dateIssued"
							onChange={handleChange}></input>
					</td>
				</>
			) : (
				<></>
			)}
			<td>
				{isCreating ? (
					<div className="icons">
						<span>
							<FontAwesomeIcon
								icon={faCheck}
								onClick={handleAddNewCommander}
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
					</div>
				) : (
					<div className="icons" onClick={handleIsCreating}>
						Add Charter
						<FontAwesomeIcon icon={faPlus} style={{ marginLeft: ".5rem" }} />
					</div>
				)}
			</td>
		</tr>
	);
}

export default AddCharter;
