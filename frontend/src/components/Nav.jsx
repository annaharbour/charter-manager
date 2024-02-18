import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faUser, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";


function Nav() {
  return (
    <div>
      <FontAwesomeIcon className='nav-icon' icon={faBars} />
      <FontAwesomeIcon className='nav-icon' icon={faX}/>
      <FontAwesomeIcon className='nav-icon' icon={faUser}/>
      <FontAwesomeIcon className='nav-icon' icon={faCaretUp}/>
      <FontAwesomeIcon className='nav-icon' icon={faCaretDown}/>
    </div>
  )
}

export default Nav
