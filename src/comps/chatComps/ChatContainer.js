import React, { useState } from "react";
import { ChatBody } from "./ChatBody";
import "./ChatContainer.css";
import img from "../../assets/chat.png";

const ChatContainer = ({setCommand, setShrinkMain }) => {
  /*
    ChatContainer: Overarching div that displays the open chat button/can open the chatBody when 
                   opened, contains the boolean for whether or not the boolean is open. 
    setCommand   : Prop from App to set the command on the initial page. May turn to a useContext later because
                   it prop drills down to ChatBody here.
  */
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const openChat = () => {
    setChatIsOpen(true);
    setShrinkMain(true);
  };


  return (
    <div>
      {!chatIsOpen && (
        <button className="toggleChatButton" onClick={openChat}>
          <img className="openButton" src={img} alt="Open Chat" />
        </button>
      )}
      {chatIsOpen && (
        <ChatBody setChatIsOpen={setChatIsOpen} setCommand={setCommand} setShrinkMain={setShrinkMain}/>
      )}
    </div>
  );
};

export default ChatContainer;