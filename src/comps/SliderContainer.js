import Slider from "./Slider"
import {useState, useEffect} from "react";
import "./styles/SliderContainer.css";
import {Chart, Line, Bar, Pie} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend} from 'chart.js';
import rxImg from "../assets/rx.png"
import autoImg from "../assets/auto.png"
import financeImg from "../assets/finance.png"
import ppvImg from "../assets/ppv.png"
import travelImg from "../assets/travel.png"
import cpgImg from "../assets/cpg.png"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const SliderContainer = ({command, shrinkMain, graphText}) => {
    /*
        SliderContainer: Houses all the sliders as well as handles the randomization of each element onChange of one.
                         For now, one bar directly changes all other bars, and each has their own state. These need to
                         be set on an individual level, which may or may not have to change in the future. Don't want to
                         invest too much time into something that may need serious change when applied to real data. 
    */
    const [budgetSlider, setBudgetSlider] = useState(750000);
    const [impressionCount, setImpressionCount] = useState(50000000);
    const [campaignWeeks, setCampaignWeeks] = useState(50);
    const [avgFreq, setAvgFreq] = useState(5);
    const [liftSlider, setLiftSlider] = useState(50);
    // Sliders range is determined by 2x their initial value, assumes min is 0.
    const [budgetInput, setBudgetInput] = useState(0);
    const [impressionInput, setImpressionInput] = useState(0);
    const [campaignInput, setCampaignInput] = useState(0);
    const [frequencyInput, setFrequencyInput] = useState(0);
    const [liftInput, setLiftInput] = useState(0);

    
    const [selectedCategory, setSelectedCategory] = useState("");

    const randVal = (min, max) => Math.floor(Math.random() * (max-min + 1)) + min;

    const execCmd = (cmd) => {
        const cleanCmd = cmd.toLowerCase();
        const cmdIndex = cleanCmd.indexOf(" ");
        const valueIndex = cleanCmd.lastIndexOf(" ");
        console.log("Values:", cmdIndex, valueIndex);

        var finalCmd;
        var param;
        var value;
        if(cmdIndex !== -1 && valueIndex !== -1) { // NOT single word cmd
            finalCmd =cleanCmd.substring(0, cmdIndex);
            param = cleanCmd.substring(cmdIndex+1, valueIndex);
            value = cleanCmd.substring(valueIndex+1);
        }
        else{
            finalCmd = cmd; // for single line CMD's like reset, index slices will be -1
        }

        const acceptableCmds = ["/set","/help","/reset"];
        const acceptableFields = ["budget","impression count","campaign weeks","avg frequency"];
        if (acceptableCmds.includes(finalCmd)){
            switch(finalCmd){
                case '/set':
                    if(acceptableFields.includes(param)){
                        handleSlider(value, param);
                    }
                    break;
                case '/reset':
                    setBudgetSlider(50);
                    setAvgFreq(5);
                    setCampaignWeeks(50);
                    setImpressionCount(50000000);
                    break;
                default:
                    console.error("Unacceptable Start: ", finalCmd);
            }
        }
        else console.error("Unacceptable Command: ",cmd)

    }

    useEffect(() =>{
        // throws a warning for a missing dependency, but nothing serious rn 
        if (command){
            execCmd(command);
        }
    }, [command]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        //console.log("Selected Category is now ", selectedCategory);
    }

    const removeGraph = (index) => {
        const newList = graphArray.filter((_, itemIndex) => itemIndex !== index);
        setGraphArray(newList);
    };

    const categoryImages = {
        item1: autoImg,
        item2: rxImg,
        item3: financeImg,
        item4: ppvImg,
        item5: travelImg,
        item6: cpgImg,
    };

    const categoryNames = {
        "" : "Select a Category",
        item1: "Automotive Total Category",
        item2: "Pharma Total Category",
        item3: "Finance Total Category",
        item4: "Pay-Per-View Total Category",
        item5: "Travel Total Category",
        item6: "Consumer Goods Total Category",
    }

    const variableMap = {
        'Budget': budgetSlider,
        "Impression Count": impressionCount,
        'Campaign Weeks': campaignWeeks,
        'Avg Frequency': avgFreq,
        'Lift':liftSlider,
    };

    const createGraphComponent = (contentObject) => {
        const dataObj = [{
            label: "Value",
            data: contentObject.datasets, 
            borderColor: "rgb(255,0,0)",
            borderWidth: "1",
        }]

        const test = {
            datasets: dataObj,
            labels: contentObject.labels,
        }
        const graphTypes = {
            "Bar": <Bar data={test} height={"300%"} options={{maintainAspectRatio: false}} />,
            "Line": <Line data={test} height={"300%"} options={{maintainAspectRatio: false}}  />,
            "Pie": <Pie data={test} height={"300%"} options={{maintainAspectRatio: false}}  /> //Dependencies not imported yet
        }
        const retval = graphTypes[contentObject.type];
        console.log("TO RETURN", retval)
        return retval;
    }


    const handleMetricSubmit = () => { // ADJUST SECOND PART OF TURNARY TO FILL OUT WITH MODEL OUTPUT GIVEN FIRST INPUTS 
        budgetInput ? setBudgetSlider(budgetInput) : setBudgetSlider(randVal(0,1500000));
        liftInput ? setLiftSlider(liftInput) : setLiftSlider(randVal(0, 100));
        frequencyInput ? setAvgFreq(frequencyInput) : setAvgFreq(randVal(0,10));
        campaignInput ? setCampaignWeeks(campaignInput) : setCampaignWeeks(randVal(0,100));
        impressionInput ? setImpressionCount(impressionInput) : setImpressionCount(randVal(0, 100000000));
    }

    const handleSlider = (value, name) => {
        // Based on name, adjust all other sliders
        // NOTE: Not sure how each slider will interact with one another, so each are individually adjusted.
        //       Cant say for sure if this is how its going to stay because its more involved than I would prefer.

        const cleanName = name.toLowerCase();
        switch (cleanName) {
            case 'budget':
                setBudgetSlider(parseInt(value));
                // RAND OTHERS
                setImpressionCount(randVal(0,100000000)) // not great to hardcode upper limit, come back later
                setCampaignWeeks(randVal(0,100));
                setAvgFreq(randVal(0,10));
                break;
            case 'impression count':
                setImpressionCount(parseInt(value));
                // RAND OTHERS
                setBudgetSlider(randVal(0, 1500000));
                setCampaignWeeks(randVal(0,100));
                setAvgFreq(randVal(0,10));
                break;
            case 'campaign weeks':
                setCampaignWeeks(parseInt(value));
                // RAND OTHERS
                setBudgetSlider(randVal(0, 1500000));
                setImpressionCount(randVal(0,100000000));
                setAvgFreq(randVal(0,10));
                break;
            case 'avg frequency':
                setAvgFreq(parseInt(value));
                // RAND OTHERS
                setBudgetSlider(randVal(0, 1500000));
                setImpressionCount(randVal(0,100000000));
                setCampaignWeeks(randVal(0,100));
                break;
            case 'lift':
                setLiftSlider(value);
                break;
            default:
                console.error("Unexpected Slider Adjustment:",name);
                break;
        }
    }


    //TEST
    useEffect(() => {
        createNewGraph()
    }, [graphText])

    const [graphArray, setGraphArray] = useState([]);

    const createNewGraph = () =>{

        if(graphText[0]){
            console.log("Chart type",graphText[0]);
            console.log(graphText[1]);
            console.log(graphText[2]);
            
            const strVars = graphText[2];
            const varlist = strVars.map(val => variableMap[val]);
            console.log(varlist, "SHOULD BE ACTUALS")

            const graphDataVals = {
                type: graphText[0],
                labels: graphText[1],
                datasets: varlist,
            }
            setGraphArray(prevGraphs => [...prevGraphs, graphDataVals])
        }

    }

    const options = {
        responsive: true,
    };

    const data = {
        labels:[
            "Budget",
            "Impressions",
            "Weeks",
            "Freq"
        ],
        datasets : [
            {
                label: "Vals",
                data: [budgetSlider, impressionCount,campaignWeeks, avgFreq],
                borderColor: "rgb(75,192,192)",
                borderWidth: "1",
            },
        ],
    };

    const dataTest= {
        labels:[
            "Budget",
            "Avg Budget",
            "Median Budget",
        ],
        datasets : [
            {
                label: "USD",
                data: [budgetSlider, 481396, 438494],
                borderColor: "rgb(75,192,192)",
                borderWidth: "1", 
            },
        ],
    };


    const impressionsData = {
        labels:[
            "Booked Impressions",
            "Delivered Impressions",
            "Budget",
        ],
        datasets : [
            {
                label: "Impressions",
                data: [impressionCount, (impressionCount*1.2), budgetSlider],
                borderColor: "rgb(75,192,192)",
                borderWidth: "1",
            },
            {
                label: "USD",
                data: [budgetSlider, budgetSlider, budgetSlider],
            },
        ],
    };
    
    // end test
    return (
        <div className="SliderContainer">
            <div className="categorySelection">
                
                <select id="dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Campaign Category</option>
                <option value="item1">Auto</option>
                <option value="item2">Pharmaceutical</option>
                <option value="item3">Financial</option>
                <option value="item4">Pay Per View </option>
                <option value="item5">Travel</option>
                <option value="item6">Consumer Package Goods</option>
                </select>
                {/* Maybe add brand specific later? */}
                <div className="categoryTitle">
                    <h1>{categoryNames[selectedCategory]}</h1>
                </div>
                <div className="categoryImage">
                    <img src={categoryImages[selectedCategory]}></img>
                </div>
            </div>
            {/* <div className="targetSlider">
                <h2>Target Lift %</h2>
                <Slider initVal={50} name="Lift" onSliderChange={handleSlider} sliderVal={liftSlider}/>
            </div> */}
            <div className="metricContainer">
                <div className="dataEntry">
                    <div className="dataField">
                        <h3> Lift</h3>
                        <input className="liftInput" type="text" placeholder={liftSlider} 
                            onChange={(e) => setLiftInput(e.target.value)}
                        />
                    </div>
                    <div className="dataField">
                        <h3> Budget</h3>
                        <input className="budgetInput" type="text" placeholder={budgetSlider} 
                            onChange={(e) => setBudgetInput(e.target.value)}
                        />
                    </div>
                    <div className="dataField">
                        <h3> Impression Count</h3>
                        <input type="text" placeholder={impressionCount}
                            onChange={(e) => setImpressionInput(e.target.value)}
                        />
                    </div>
                    <div className="dataField">
                        <h3> Campaign Weeks</h3>
                        <input type="text" placeholder={campaignWeeks} 
                            onChange={(e) => setCampaignInput(e.target.value)}
                        />
                    </div>
                    <div className="dataField">
                        <h3> Avg Frequency</h3>
                        <input type="text" placeholder={avgFreq}
                            onChange={(e) => setFrequencyInput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="metrics">
                    {/*<header style={{fontWeight: "500"}}>Predicted Metrics:</header>*/}
                    <Slider initVal={50} name="Lift" onSliderChange={handleSlider} sliderVal={liftSlider}/>
                    <Slider initVal={750000} name="Budget" onSliderChange={handleSlider} sliderVal={budgetSlider} />
                    <Slider initVal={50000000} name="Impression Count" onSliderChange={handleSlider} sliderVal={impressionCount} />
                    <Slider initVal={50} name="Campaign Weeks" onSliderChange={handleSlider} sliderVal={campaignWeeks} />
                    <Slider initVal={5} name="Avg Frequency" onSliderChange={handleSlider} sliderVal={avgFreq} />
                </div>
                <div className="metricFooter">
                    <button onClick={handleMetricSubmit}>Submit</button>
                </div>
            </div>
            <div className="plotDiv">
                {/*<Line data={data}/>*/}
                <div className="graphSlot">
                    <Bar data={data} height={"300%"} options={{maintainAspectRatio: false}}/>
                </div>
                <div className="graphSlot">
                    <Bar data={dataTest} height={"300%"} options={{maintainAspectRatio: false}} />
                </div>
            </div>
            <div className="plotDiv">
                {[...graphArray].map((graphData, i) => <div className="graphSlot" onDoubleClick={() => removeGraph(i)}> {createGraphComponent(graphData)} </div>)}
            </div>
        </div>
    );
}

export default SliderContainer;