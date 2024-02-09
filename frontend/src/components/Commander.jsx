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
		<div
			className="commander-card"
			background-image={image}
			alt={Commander.name}>
			{isDeceased ? <FontAwesomeIcon icon={faStar} /> : ""}
			<h6>{name}</h6>
			<p>{postNum}</p>
			{formatDate(dateStart)} - {formatDate(dateEnd)}
		</div>
	);
}

export default Commander;
