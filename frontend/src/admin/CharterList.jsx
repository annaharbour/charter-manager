import React, { useState, useEffect } from "react";
import axios from "axios";
import CharterItem from "./CharterItem";
import AddCharter from "./AddCharter";

function CharterList() {
	const [isCreating, setIsCreating] = useState(false);
	const [charters, setCharters] = useState([]);
	const [newCharter, setNewCharter] = useState({
		name: "",
		dateIssued: "",
		charterImage: ""
	});

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

	const updateCharter = async (updatedCharter) => {
		try {
			const res = await axios.put(
				`http://localhost:5000/api/charters/${updatedCharter._id}`,
				updatedCharter
			);
			const updatedData = res.data;
			console.log(updatedData);
			setCharters((prev) =>
				prev.map((charter) =>
					charter._id === updatedData._id ? updatedData : charter
				)
			);
		} catch (err) {
			console.error("Charter not updated", err);
		}
	};


	const addNewCharter = async (newCharter) => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/charters",
				newCharter
			);
			const addedCharter = res.data;
			setCharters((prev) => [...prev, addedCharter]);
			setNewCharter({
				name: "",
				dateIssued: "",
				charterImage: ""
			});
		} catch (err) {
			console.error("Error adding commander", err);
		}
	};

const deleteCharter = async (charterId) => {
  try {
    await axios.delete(`http://localhost:5000/api/charters/${charterId}`);
    setCharters((prev) => prev.filter((charter) => charter._id !== charterId));
  } catch (err) {
    console.error("Charter not deleted", err);
  }
};

	return (
		<div>
			<table className="rwd-table">
				<thead>
					<tr>
						<th>Post Number</th>
						<th></th>
						<th>Commanders</th>
						<th>Date Issued</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{charters.map((charter) => (
						<CharterItem
							key={charter._id}
							charter={charter}
							onUpdateCommander={updateCharter}
							onDeleteCommander={deleteCharter}
						/>
					))}
					<AddCharter
						newCharter={newCharter}
						addNewCharter={addNewCharter}
						isCreating={isCreating}
						setIsCreating={setIsCreating}
					/>
				</tbody>
			</table>
		</div>
	);
}

export default CharterList;
