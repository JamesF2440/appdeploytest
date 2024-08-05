import React, { useState } from 'react';
import './styles/PopupContainer.css';

const PopupContainer = ({ handlePopup, shrinkMain, setGraphText}) => {
    const [graphType, setGraphType] = useState('');
    const [labels, setLabels] = useState(['']);
    const [data, setData] = useState(['']);

    const closePopup = () => {
        handlePopup();
    };

    const createGraphText = () => {
        // console.log("Type", graphType)
        // console.log("Labels List", labels)
        // console.log("data", data)
        const graphText = [graphType, labels, data]
        setGraphText(graphText)
        handlePopup();
    }

    const handleGraphTypeChange = (event) => {
        setGraphType(event.target.value);
    };

    const handleLabelChange = (index, event) => {
        const newLabels = [...labels];
        newLabels[index] = event.target.value;
        setLabels(newLabels);
    };

    const handleDataChange = (index, event) => {
        const newData = [...data];
        newData[index] = event.target.value;
        setData(newData);
    };

    const addLabelDataPair = () => {
        setLabels([...labels, '']);
        setData([...data, '']);
    };

    const removeLabelDataPair = (index) => {
        const newLabels = [...labels];
        const newData = [...data];
        newLabels.splice(index, 1);
        newData.splice(index, 1);
        setLabels(newLabels);
        setData(newData);
    };

    return (
        <div className={`popupOverlay ${shrinkMain ? 'shrink' : ''}`}>
            <div className={`popupBox ${shrinkMain ? 'shrink' : ''}`}>
                <button className='closeOverlay' onClick={closePopup}>X</button>
                <h1>Create New Graph</h1>
                <div className='graphInputs'>
                    <select value={graphType} onChange={handleGraphTypeChange}>
                        <option value="">Select a graph type</option>
                        <option value="Bar">Bar</option>
                        <option value="Line">Line</option>
                        <option value="Pie">Pie</option>
                    </select>
                </div>
                <div className='scrollableInputs'>
                {labels.map((label, index) => (
                    <div className='addRemoveData' key={index}>
                        <input
                            type="text"
                            value={label}
                            onChange={(event) => handleLabelChange(index, event)}
                            placeholder="Label"
                        />
                        <select 
                            value={data[index]} 
                            onChange={(event) => handleDataChange(index, event)}
                        >
                            <option value="">Select Data Stream</option>
                            <option value="Budget">Budget</option>
                            <option value="Impression Count">Impression Count</option>
                            <option value="Campaign Weeks">Campaign Weeks</option>
                            <option value="Avg Frequency">Avg Frequency</option>
                            <option value="Lift">Lift</option>
                        </select>
                        <button className="removeLabelDataPair" onClick={() => removeLabelDataPair(index)}>Remove</button>
                    </div>
                ))}
                    <button className="addLabelDataPair" onClick={addLabelDataPair}>Add Label/Data Pair</button>
                </div>
                <div className='popupBottom'>
                    <button className='createGraphButton' onClick={createGraphText}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default PopupContainer;