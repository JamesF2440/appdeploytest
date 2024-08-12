import ChatContainer from "./chatComps/ChatContainer";
import Header from "./Header"
import axios from "axios"

const Reports = ({setShrinkMain, shrinkMain}) => {

    const handleAPITest = async () => {
        const response = await axios.post("https://uatfnybvgi.execute-api.us-west-2.amazonaws.com/test/getResponse", {"prompt":"Hi Chat!"})
        console.log(response.data.body)
    }

    return (
      <div >
        <Header shrinkMain={shrinkMain}/>
        <div className={`pageContainer ${shrinkMain ? 'shrink' : ''}`}>
            <h1>Profile</h1>
            <button className="apiTest" onClick={handleAPITest} >API Call Test</button>

        </div>
        {/* <ChatContainer setShrinkMain={setShrinkMain} /> out for now in favor of chat tab */}
      </div>
    );
  };
  
  export default Reports;