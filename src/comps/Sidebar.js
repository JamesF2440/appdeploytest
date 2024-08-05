import './styles/Sidebar.css'; 
import {useState} from 'react';
import sidebar from "../assets/sidebar.png"
import {Link} from "react-router-dom"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className='toggleSidebarButton' onClick={toggleSidebar}>
        {/* {isOpen ? 'Close Sidebar' : 'Open Sidebar'} */}
        <img src={sidebar} style={{ transform: isOpen ? "rotate(270deg)" : "rotate(0)", transition: "all .4s ease-in"}} />
      </button>
      <div className={`slidingText${isOpen ? "open" : ""}`}>
        <Link className='navLink' to="/">Dashboard</Link>
        <Link className='navLink' to="/reports">Reports</Link>
      </div>
    </div>
  );
};

export default Sidebar;