import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../common/formatDate";

function Commander({ name, image, isDeceased, postNum, dateStart, dateEnd }) {
	return (
		<div className="commander-container">
			<div className="commander-img">
				<img src={image} alt={name} />
				{!isDeceased ? <FontAwesomeIcon className="star" icon={faStar} /> : ""}
			</div>
			<div className="commander-info">
				<h4>{name}</h4>
				<p>Post #{postNum}</p>
				<p>
					<i>
						{formatDate(dateStart)} - {formatDate(dateEnd)}
					</i>
				</p>
			</div>
		</div>
	);
}

export default Commander;
