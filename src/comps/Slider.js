import "./styles/Slider.css"
//import {useRef, useEffect, useState} from "react";

const Slider = ({initVal, name, onSliderChange, sliderVal}) =>{
    /*
        Slider: Individual Slider Comp, has some smaller divs for the min/max of each but
                can be adjusted as needed. Simple displays for now. 
        Props : initVal - the initial state of the input bar. Max is 2x this
                name - Name of the slider input, used in parent switch case
                onSliderChange - Passed up to parent to adjust other sliders within slider.
                sliderVal - value of slider, passed up and down to format the number
    */
    const formatNum = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
          }
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          }
          if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          }
          return num;
    }

    const handleSliderChange = (e) =>{
        // Pass slider val and name up to parent 
        onSliderChange(e.target.value, name);
    }

    
    const thumbPos = (((sliderVal) / (initVal*2)) *100) ; // PRESUMES MIN IS 0
    const lengthOf = formatNum(sliderVal).length;
    const test = (thumbPos - ((sliderVal/initVal*2)));
    

    return(
        <div className='Slider'>
            <h3>{name}</h3>
            <input className="inputSlider" onChange={handleSliderChange} type="range" min="0" max={initVal*2} value={sliderVal}
            style={{background: `linear-gradient(to right, #ef0303 0%, #ef030380 ${thumbPos}%, #ddd ${thumbPos}%)`}}
            />
            <div className="lowerText">
                <p style={{marginLeft: `${(test)}%`, textAlign: "center", maxWidth: "100%"}}>{formatNum(sliderVal)}</p>
            </div>
        </div>
    )
}

export default Slider;