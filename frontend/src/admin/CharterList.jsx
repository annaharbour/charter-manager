import React, { useState, useEffect } from "react";
import CharterItem from "./CharterItem";
import AddCharter from "./AddCharter";
import {
	updateCharterReq,
	getCharters,
	addCharter,
	delCharter,
} from "../services/chartersService";

function CharterList() {
	const [isCreating, setIsCreating] = useState(false);
	const [charters, setCharters] = useState([]);
	const [newCharter, setNewCharter] = useState({
		name: "",
		dateIssued: "",
		charterImage: "",
	});

	useEffect(() => {
		const fetchCharters = async () => {
			try {
				const response = await getCharters();
				setCharters(response.data.charters);
			} catch (error) {
				console.error("Error fetching charters: ", error);
			}
		};

		fetchCharters();
	}, []);

	const updateCharter = async (updatedCharter) => {
		console.log(updatedCharter._id);
		try {
			const res = await updateCharterReq(updatedCharter);
			const updatedData = res.data;
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
			const res = await addCharter(newCharter);
			const addedCharter = res.data;
			setCharters((prev) => [...prev, addedCharter]);
			setNewCharter({
				name: "",
				dateIssued: "",
				charterImage: "",
			});
		} catch (err) {
			console.error("Error adding commander", err);
		}
	};

	const deleteCharter = async (charterId) => {
		try {
			await delCharter(charterId);
			setCharters((prev) =>
				prev.filter((charter) => charter._id !== charterId)
			);
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
						<th>Date Issued</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{charters && charters.map((charter) => (
						<CharterItem
							key={charter._id}
							charter={charter}
							onUpdateCharter={updateCharter}
							onDeleteCharter={deleteCharter}
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
