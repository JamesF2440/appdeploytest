import "./ChatHeader.css";
import logo from "../../assets/logo.png";

const ChatHeader = () =>{
    /*
        ChatHeader: Seperate comp for styling purposes and separation.
    */

    return(
        <div className="ChatHeader">
            <p className="ChatName">EDS Chatbot</p>
            <img src={logo} alt="DLogo" className="DishLogo"/>
        </div>
    ) 
};

export default ChatHeader;