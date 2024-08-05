import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './comps/Dashboard.js';
import Reports from "./comps/Reports.js"
import { useState } from 'react';


function App() {

  const [command, setCommand] = useState("");
  const [shrinkMain, setShrinkMain] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard setShrinkMain={setShrinkMain} shrinkMain={shrinkMain}/>}/>
          <Route path="/reports" element={<Reports setShrinkMain={setShrinkMain} shrinkMain={shrinkMain} />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;