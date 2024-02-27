import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faX,
	faUser,
	faCaretUp,
	faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

// This is just for admin. Intention is for it to be a hamburger and user icon positioned in the upper left corner on mobile. The user icon will have carets for open/shut with a logout dropdown. The hamburger opens up to admin navigation to the commander list and charter list if we wanted to put them on separate pages.

function Nav() {
	return (
		<div>
			{/* <FontAwesomeIcon className='nav-icon bars' icon={faBars} />
      <FontAwesomeIcon className='nav-icon x' icon={faX}/>
      <FontAwesomeIcon className='nav-icon user' icon={faUser}/>
      <FontAwesomeIcon className='nav-icon caret-up' icon={faCaretUp}/>
      <FontAwesomeIcon className='nav-icon caret-down' icon={faCaretDown}/> */}
		</div>
	);
}

export default Nav;
