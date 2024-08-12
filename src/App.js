import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './comps/Dashboard.js';
import Reports from "./comps/Reports.js"
import { useState, createContext } from 'react';


export const AppContext = createContext();

function App() {
  const initMessage = {
    text: "Welcome! Feel free to ask any questions!",
    sender: "defaultText",
  };
  //const [command, setCommand] = useState(""); // maybe depricated but potentially useful still 
  const [shrinkMain, setShrinkMain] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [messageList, setMessageList] = useState([initMessage]);


  return (
      <div className="App">
        <AppContext.Provider value={{isOpen, setIsOpen, chatIsOpen, setChatIsOpen, messageList, setMessageList}} >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard setShrinkMain={setShrinkMain} shrinkMain={shrinkMain}/>}/>
              <Route path="/profile" element={<Reports setShrinkMain={setShrinkMain} shrinkMain={shrinkMain} />} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
  );
}

export default App;