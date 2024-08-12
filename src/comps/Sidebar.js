import './styles/Sidebar.css'; 
import sidebar from "../assets/sidebar.png"
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { AppContext } from '../App';

const Sidebar = ({shrinkMain}) => {
  //const [isOpen, setIsOpen] = useState(false);
  const {isOpen, setIsOpen} = useContext(AppContext)

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className='toggleSidebarButton' onClick={toggleSidebar}>
        {/* {isOpen ? 'Close Sidebar' : 'Open Sidebar'} */}
        <img className={`sbImg ${shrinkMain ? 'shrink' : ''}`} src={sidebar} alt='sidebarIcon' style={{ transform: isOpen ? "rotate(270deg)" : "rotate(0)", transition: "all .4s ease-in"}} />
      </button>
      <div className={`slidingText${isOpen ? "open" : ""}`}>
        <Link className={`navLink ${shrinkMain ? 'shrink' : ''}`} to="/">Home</Link>
        <Link className={`navLink ${shrinkMain ? 'shrink' : ''}`} to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Sidebar;