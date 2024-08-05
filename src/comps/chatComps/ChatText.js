import React, { useEffect, useRef } from "react";

const ChatText = ({ messageList }) => {
  /* 
    ChatText: makes up the objects that are visible as chat bubbles, loading, etc. 
    messageList : State obj, contains a list of all the text for each <li> entry in the <ul>
  */
  const messageEl = useRef(null);

  useEffect(() => {
    // Scroll to bottom of list upon update 
    const timer = setTimeout(() => {
      if (messageEl.current) {
        const { scrollHeight } = messageEl.current;
        messageEl.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
      }
    }, 100); // A delay of 100ms to ensure vDOM updates

    return () => clearTimeout(timer);
  }, [messageList]);

  return (
    <div className="chatScrollable">
      {/* Scrollable div, hidden bar, but autoscrolls upon any user/SS message. messages are list indices */}
      <ul ref={messageEl}>
        {messageList.map((message, index) => (
          <li
            key={index}
            className={`messageText ${
              message.sender === "user" ? "User" : "Response" // classify message to determine styling 
            }`}
          >
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatText;
