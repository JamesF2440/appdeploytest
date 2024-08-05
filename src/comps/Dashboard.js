import SliderContainer from './SliderContainer';
import ChatContainer from './chatComps/ChatContainer';
import Header from "./Header.js"
import {useState} from 'react';
import html2canvas from 'html2canvas';
import dl from "../assets/file.png"
import PopupContainer from './PopupContainer.js';


function Dashboard({setShrinkMain, shrinkMain}) {
  const [command, setCommand] = useState("");
  //const [shrinkMain, setShrinkMain] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);
  const [graphText, setGraphText] = useState([]);

  const handlePopup = () => {
    setTogglePopup(!togglePopup);
  }

  const handleDownload = () =>{
    const toDownload = document.querySelector(".pageContainer");

    html2canvas(toDownload).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href=image;
      link.download = 'campaign-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  const getDate = () =>{
    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <div className="App">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js"></script>
        <Header shrinkMain={shrinkMain} />
        <div className={`pageContainer ${shrinkMain ? 'shrink' : ''}`}>
          {/*<h1>Create Projection</h1>*/}
          <h3>From {getDate()} </h3>
          <div className='contentContainer'>
            <SliderContainer command={command} shrinkMain={shrinkMain} graphText={graphText}/>
            <div className='containerFooter'>
              <button className='downloadImg' onClick={handleDownload}><img src={dl}/></button>
              <button className='generateReport' onClick={handlePopup} >New Graph </button>
            </div>
          </div>
          {togglePopup && <div>
              <PopupContainer handlePopup={handlePopup} shrinkMain={shrinkMain} setGraphText={setGraphText} />
          </div>}
        </div>
        
        <ChatContainer setCommand={setCommand} setShrinkMain={setShrinkMain}/>
    </div>
  );
}

export default Dashboard;