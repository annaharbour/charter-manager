import React from "react";
import {formatYear} from '../common/formatDate'

function Charter({ dateIssued, charterImage }) {
	

	return (
		<div className="charter">
			{/* <img src={charterImage} alt={`charter ${dateIssued}`}/> */}
			<h3 className="charter-year">{formatYear(dateIssued)} Charter</h3>
		</div>
	);
}

export default Charter;
