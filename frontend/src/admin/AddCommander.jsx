import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatYear } from "../common/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faX,
	faCheck,
	faMinus,
	faPlus,
	faCamera,
} from "@fortawesome/free-solid-svg-icons";

function AddCommander({ isCreating, setIsCreating, addNewCommander }) {
	const [isDeceased, setIsDeceased] = useState(false);
	const [charters, setCharters] = useState([]);
	const [selectedCharter, setSelectedCharter] = useState("");
	const [image, setImage] = useState("");
	const [newCommander, setNewCommander] = useState({
		name: "",
		dateStart: "",
		dateEnd: "",
		image: "",
	});

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

	const handleIsCreating = () => {
		setIsCreating(true);
	};

	const handleCancelClick = (e) => {
		setSelectedCharter("");
		setIsCreating(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewCommander((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddCharter = (charterId) => {
		if (charterId) {
			const selectedCharter = charters.find(
				(charter) => charter._id === charterId
			);

			setNewCommander((prev) => ({
				...prev,
                charters: Array.isArray(prev.charters) ? [...prev.charters, selectedCharter] : [selectedCharter],
			}));
		}
	};

	const handleRemoveCharter = (charterId) => {
		setNewCommander((prev) => ({
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

	const onStarClick = () => {
		setIsDeceased(!isDeceased);
	};

	const handleAddNewCommander = async () => {
		try {
			const newCommanderWithImage = { ...newCommander, image, isDeceased };
			await addNewCommander(newCommanderWithImage);
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
					<td data-th="Name:">
						<input
							type="text"
							name="name"
							value={newCommander.name}
							onChange={handleChange}></input>
					</td>
					<td>
						<div className="icons">
							<span>
								<FontAwesomeIcon
									icon={faStar}
									style={{ color: isDeceased ? "#a79055" : "#ffffff" }}
									value={newCommander.isDeceased}
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
						{newCommander.charters && newCommander.charters.map((charter) => (
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
					<div className="icons" onClick={handleIsCreating} >
                        Add Commander
						<FontAwesomeIcon icon={faPlus} style={{marginLeft: '.5rem'}}/>
					</div>
				)}
			</td>
		</tr>
	);
}

export default AddCommander;
