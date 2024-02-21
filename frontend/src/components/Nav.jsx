import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faUser, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";


function Nav() {
  
  return (
    <div>
      <FontAwesomeIcon className='nav-icon bars' icon={faBars} />
      <FontAwesomeIcon className='nav-icon x' icon={faX}/>
      <FontAwesomeIcon className='nav-icon user' icon={faUser}/>
      <FontAwesomeIcon className='nav-icon caret-up' icon={faCaretUp}/>
      <FontAwesomeIcon className='nav-icon caret-down' icon={faCaretDown}/>
    </div>
  )
}

export default Nav
