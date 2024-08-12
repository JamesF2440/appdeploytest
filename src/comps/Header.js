import React from 'react';
import './styles/Header.css'; 
import dishmedia from "../assets/dmpng.png"
import Sidebar from './Sidebar';
import {Link} from "react-router-dom"
import tmp from "../assets/emptyPfp.png"


const Header = ({shrinkMain}) => {

  return (
    <div className={`header ${shrinkMain ? 'shrink' : ''}`}>
      <div className={`leftColumn ${shrinkMain ? 'shrink' : ''}`}>
        <Sidebar shrinkMain={shrinkMain}/>
      </div>
      {/* <div className={`pageTitle ${shrinkMain ? 'shrink' : ''}`}>Campaign Outcomes</div> */}
      <div className={`pageTitle ${shrinkMain ? 'shrink' : ''}`}>
        <img className={`dishMediaLogo ${shrinkMain ? 'shrink' : ''}`} src={dishmedia}/>
      </div>
      <div className='rightColumn'>
          <Link to="/profile">
            <img className='profileImg' src={tmp} alt='profile'></img>
          </Link>
      </div>
    </div>
  );
};

export default Header;