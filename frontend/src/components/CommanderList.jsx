import React, { useState, useEffect } from "react";
import Charter from "./Charter";
import Commander from "./Commander";

function CommanderList() {
	const [charters, setCharters] = useState([]);
	const [commandersByCharterId, setCommandersByCharterId] = useState({});

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

	useEffect(() => {
		const fetchCommandersForCharter = async (charterId) => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/commanders/charter/${charterId}`
				);
				if (!response.ok) {
					throw new Error(
						`Error fetching commanders for charter ${charterId}: ${response.statusText}`
					);
				}
				const data = await response.json();
				const { commanders } = data;
				setCommandersByCharterId((prevState) => ({
					...prevState,
					[charterId]: commanders,
				}));
			} catch (error) {
				console.error(error);
				throw error;
			}
		};

		charters.forEach((charter) => {
			fetchCommandersForCharter(charter._id);
		});
	}, [charters]);

	return (
		<div className="commander-list">
			<h1>Commanders by Charter</h1>
			{charters.map((charter) => (
				<div key={charter._id}>
					<Charter
						dateIssued={charter.dateIssued}
						charterImage={charter.charterImage}/>
						<div className="commanders">
							{commandersByCharterId[charter._id]?.map((commander) => (
								<Commander
									key={commander._id}
									image={commander.image}
									name={commander.name}
									postNum={commander.postNum}
									isDeceased={commander.isDeceased}
									dateStart={commander.dateStart}
									dateEnd={commander.dateEnd}
								/>
							))}
						</div>
					
				</div>
			))}
		</div>
	);
}

export default CommanderList;

// Grid of two columns
// Admin function: edit or delete entries
