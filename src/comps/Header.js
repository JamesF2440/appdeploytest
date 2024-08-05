import React from 'react';
import './styles/Header.css'; 
import dishmedia from "../assets/dmpng.png"
import Sidebar from './Sidebar';

const Header = ({shrinkMain}) => {

  return (
    <div className={`header ${shrinkMain ? 'shrink' : ''}`}>
      <div className='leftColumn'>
        <Sidebar />
      </div>
      <div className='pageTitle'>Campaign Outcomes</div>
      <div className='rightColumn'>
        <img className='dishMediaLogo' src={dishmedia}/>
      </div>
    </div>
  );
};

export default Header;