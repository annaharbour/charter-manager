import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CommanderItem from "./CommanderItem";

function CommanderList() {
	const [commanders, setCommanders] = useState([]);

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

	function onUpdateCommander(updatedCommander) {
		// update database with new commander using axios
		console.log(updatedCommander);
	}

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
							onUpdateCommander={onUpdateCommander}
						/>
					))}
					<tr>
						<td>
							Add Commander <FontAwesomeIcon icon={faPlus} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default CommanderList;
