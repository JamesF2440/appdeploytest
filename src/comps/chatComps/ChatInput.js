import React, { useState } from "react";
import sendImg from "../../assets/sendchat.png";
import "./ChatInput.css";

const ChatInput = ({ onMessageSubmit }) => {
  /*
    ChatInput: Essentially just the chatbox portion of the chat bot, has the textbox area, as well
               as the submission button and the ability to submit a chat on enter. Works how you assume it would.
    props    : onMessageSubmit is passed between this comp and its parent (chatBody) to tie the message to the actual
               chat component, updating the parent component. 
  */
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value); // Might be something that ends up excessively re-rendering? Unsure if serious? 
  };

  const submitChat = () => {
    if (message) {
      onMessageSubmit(message.trim()); // may undo this? Removes linebreaks from input, but makes it read "naturally"
      setMessage("");
    }
  };

  const submitChatOnEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // works on enter & return
      e.preventDefault(); // Prevent default action to avoid newline in textarea
      submitChat();
    }
  };

  return (
    <div className="textBoxContainer">
      <textarea
        className="inputTextBox"
        placeholder="Ask a question..."
        value={message}
        onChange={handleChange}
        onKeyDown={submitChatOnEnter}
      ></textarea>
      <button className="submitTextBox" onClick={submitChat}>
        <img className="submitImage" src={sendImg} alt="Submit" />
      </button>
    </div>
  );
};

export default ChatInput;