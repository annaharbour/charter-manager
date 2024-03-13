import React, { useState, useEffect } from "react";
import axios from "axios";
import CommanderItem from "./CommanderItem";
import AddCommander from "./AddCommander";

function CommanderList() {
	const [isCreating, setIsCreating] = useState(false);
	const [commanders, setCommanders] = useState([]);
	const [newCommander, setNewCommander] = useState({
		name: "",
		postNum: "",
		dateStart: "",
		dateEnd: "",
		image: "",
		charters: [],
	});

	useEffect(() => {
		const fetchCommanders = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/commanders");
				const data = await response.json();
				setCommanders(data.commanders);
			} catch (error) {
				console.error("Error fetching charters: ", error);
			}
		};

		fetchCommanders();
	}, []);

	const updateCommander = async (updatedCommander) => {
		try {
			const res = await axios.put(
				`http://localhost:5000/api/commanders/${updatedCommander._id}`,
				updatedCommander
			);
			const updatedData = res.data;
			console.log(updatedData);
			setCommanders((prev) =>
				prev.map((commander) =>
					commander._id === updatedData._id ? updatedData : commander
				)
			);
		} catch (err) {
			console.error("Commander not updated", err);
		}
	};


	const addNewCommander = async (newCommander) => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/commanders",
				newCommander
			);
			const addedCommander = res.data;
			setCommanders((prev) => [...prev, addedCommander]);
			setNewCommander({
				name: "",
				postNum: "",
				dateStart: "",
				dateEnd: "",
				image: "",
				charters: [],
			});
		} catch (err) {
			console.error("Error adding commander", err);
		}
	};

const deleteCommander = async (commanderId) => {
  try {
    await axios.delete(`http://localhost:5000/api/commanders/${commanderId}`);
    setCommanders((prev) => prev.filter((commander) => commander._id !== commanderId));
  } catch (err) {
    console.error("Commander not deleted", err);
  }
};

	return (
		<div>
			<table className="rwd-table">
				<thead>
					<tr>
						<th>Commander Name</th>
						<th></th>
						<th>Post #</th>
						<th>Charters List</th>
						<th>Service Start</th>
						<th>Service End</th>
					</tr>
				</thead>
				<tbody>
					{commanders.map((commander) => (
						<CommanderItem
							key={commander._id}
							commander={commander}
							onUpdateCommander={updateCommander}
							onDeleteCommander={deleteCommander}
						/>
					))}
					<AddCommander
						newCommander={newCommander}
						addNewCommander={addNewCommander}
						isCreating={isCreating}
						setIsCreating={setIsCreating}
					/>
				</tbody>
			</table>
		</div>
	);
}

export default CommanderList;
