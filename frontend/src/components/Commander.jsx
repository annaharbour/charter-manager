import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Commander({ name, image, isDeceased, postNum, dateStart, dateEnd }) {
	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { month: "long", day: "numeric", year: "numeric" };
		return date.toLocaleDateString("en-US", options);
	}

	return (
		<div className="commander-container">
			<div className="commander-img">
				<img src={image} alt={name} />
				{!isDeceased ? <FontAwesomeIcon className="star" icon={faStar} /> : ""}
			</div>
			<div className="commander-info">
				<h6>{name}</h6>
				<p>{postNum}</p>
				<p>
					{formatDate(dateStart)} - {formatDate(dateEnd)}
				</p>
			</div>
		</div>
	);
}

export default Commander;
