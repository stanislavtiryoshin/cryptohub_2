import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuList } from './MenuList';

import logo from '../../images/cryptohub.png';
import './Navbar.css';

const Navbar = () => {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  const menu = MenuList.map(({title, url}, index) => {
    return (
      <li key={index}>
        <NavLink to={url} activeclassname='active'>{title}</NavLink>
      </li>
    )
  })

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
        Crypto<font>Hub</font>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'} id='icon'></i>
      </div>
      <ul className={clicked ? 'menu-list' : 'menu-list closed'}>
        {menu}
      </ul>
    </nav>
  )
}

export default Navbar