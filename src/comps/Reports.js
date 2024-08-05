import ChatContainer from "./chatComps/ChatContainer";
import Header from "./Header"

const Reports = ({setShrinkMain, shrinkMain}) => {

    return (
      <div >
        <Header shrinkMain={shrinkMain}/>
        <div className={`pageContainer ${shrinkMain ? 'shrink' : ''}`}>
            <h1>Reports</h1>

        </div>
        <ChatContainer setShrinkMain={setShrinkMain} />
      </div>
    );
  };
  
  export default Reports;