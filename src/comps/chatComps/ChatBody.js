import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatText from "./ChatText";
import ChatHeader from "./ChatHeader";
import load from "../../assets/loadingGifSmall.gif"
import axios from "axios";
import "./ChatBody.css";


export const ChatBody = ({setChatIsOpen, setCommand, setShrinkMain}) => {
  /*
    ChatBody: Main component for chats, houses list of messages, and most subcomponents either stem from or
              report to this one. Updates UL tag as message list, where both user and server messages are stored.
    Props   : Boolean value for whether or not the chat should be displayed. 
  */
  const initMessage = {
    text: "Welcome! Feel free to ask any questions!",
    sender: "defaultText",
  };
  const [messageList, setMessageList] = useState([initMessage]);

  useEffect(() => {
    // This will log the updated state
    if (messageList.length > 0) {
      //console.log(messageList, "Full List"); //Includes serverside responses!
      console.log(messageList[messageList.length - 1], "Most Recent"); 
    }
  }, [messageList]);

  const handleMessageSubmit = async (newMessageText) => {
    // NewMessageText is passed up from ChatInput (textfield), and message submit 
    //   sends the message off to the API endpoint. 
    const newMessage = {
      text: newMessageText,
      sender: "user", // Sender is either user or response, user is client, response is other
    };
    setMessageList((prevMessages) => [...prevMessages, newMessage]);
    if(newMessageText[0] !== "/") try{
        displayWaiting(); //display loading gif while response loads
        await axios.options("https://uatfnybvgi.execute-api.us-west-2.amazonaws.com/test/getResponse");
        //console.log(opts, "getresponse Options");
        const response = await axios.post("https://uatfnybvgi.execute-api.us-west-2.amazonaws.com/test/getResponse", {"prompt":newMessageText});
        //console.log(response, "DEBUG: FULL RESPONSE"); //eventually return to res.data
        const tmpText = response.data.body; // may not have a .data field, can lead to undef later
        setMessageList(prevMessages => prevMessages.slice(0, -1)); 
        displayResponse(tmpText);
      }catch(error){
        console.error("Error with request:", error);
      }
    else{
      if(newMessageText === "/help"){
        const helpText = {
          text: "This is a forecasting tool, which is linked to a LLM to give additional insights. \nCurrent commands are: \n /help\n "+
          "/set \n /reset",
          sender: "helptextDefault",
        };
        setMessageList((prevMessages) => [...prevMessages, helpText]);

      }
      else{
        setCommand(newMessageText); //pass all the way up to APP s.t. command can alter sliders
      }
      
    }
  };


  const displayResponse = (response) =>{
      // Get serverside message, add to display, prob do more later
      // response is the CLEANED response.body, MAY NOT ALWAYS HAVE THIS, CHECK IT 
      const truncationIndex = response.indexOf('\\'); // THESE ARE TO REMOVE THE LLM QUESTION ADDITIONS
      const fixed = response.replace(/\\n\\n/g,' ').replace(/\\n/g, ' ').replace(/\\"/g,' ').substring(truncationIndex); // DOESNT REALLY WORK SUPER HOT
      const newResponse ={
        text: response !== undefined ? fixed : "Undefined Response from AWS!", //during testing, undef should have some visible behavior
        sender: "server",
      };
      //console.log(fixed, "RESPONSE HAS BSN??");
      setMessageList((prevMessages) => [...prevMessages, newResponse]);
  }

  const displayWaiting = () =>{
    // Displays a loading gif to give user something to look at while they wait
    const waiting ={
      text: <img src={load} alt="Loading..."/>,
      sender: "none",
      className: "thinking",
    }
    setMessageList((prevMessages) => [...prevMessages, waiting]);
  }

  const closeChat = () => {
    // pass up isOpen bool to container to display/hide 
    setChatIsOpen(false);
    setShrinkMain(false);
  };
  return (
    <div className="ChatBody">
      {/* Display all main comps, pass necessary props down. Not prop drilling bc all these directly use their
          relevant props, but might have to be a useContext depending on what additions need to be made.   */}
      <ChatHeader />
      <button className="closeChatButton" onClick={closeChat}>
        ⌄
      </button>
      <ChatText messageList={messageList} /> 
      <ChatInput onMessageSubmit={handleMessageSubmit} />
    </div>
  );
};
