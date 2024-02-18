import React from "react";

function Charter({ dateIssued, charterImage }) {
	function formatYear(dateString) {
		const date = new Date(dateString);
		return date.getFullYear();
	}

	return (
		<div className="charter">
			{/* <img src={charterImage} alt={`charter ${dateIssued}`}/> */}
			<h3 className="charter-year">{formatYear(dateIssued)} Charter</h3>
		</div>
	);
}

export default Charter;
