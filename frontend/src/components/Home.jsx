import React, { useState, useEffect } from "react";
import Charter from "./Charter";
import Commander from "./Commander";
import { getCharters } from "../services/chartersService";
import { getCommandersByCharter } from "../services/commandersService";

function CommanderList() {
	const [charters, setCharters] = useState([]);
	const [commandersByCharterId, setCommandersByCharterId] = useState({});

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

	useEffect(() => {
		const fetchCommandersForCharter = async (charterId) => {
			try {
				const response = await getCommandersByCharter(charterId);
				const { commanders } = response.data;
				setCommandersByCharterId((prevState) => ({
					...prevState,
					[charterId]: commanders,
				}));

				console.log(commandersByCharterId);
			} catch (error) {
				console.error(error);
			}
		};

		charters.forEach((charter) => {
			fetchCommandersForCharter(charter._id);
		});
	}, [charters]);

	return (
		<div className="commander-list">
			<h1>Commanders by Charter</h1>
			{charters &&
				charters.map((charter) => (
					<div key={charter._id}>
						<Charter
							dateIssued={charter.dateIssued}
							charterImage={charter.charterImage}
						/>
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