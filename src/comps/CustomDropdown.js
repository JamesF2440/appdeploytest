import React, { useState, useEffect } from 'react';
import "./styles/CustomDropdown.css"


// function useOutsideAlert(ref){
//   useEffect(() => {

//   }
// )}

const CustomDropdown = ({ options, defaultValue, selectedCategory, setSelectedCategory, onOptionChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const categories = [
    "Auto","Pharma","Financial","Pay per View", "Travel", "Consumer Package Goods"
  ]

  const handleOptionClick = (option) => {
    if(categories.includes(option)){
      setSelectedCategory(option);
    }
    setSelectedOption(option);
    onOptionChange(option);
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [selectedCategory]);

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption || "General"}
        <span className="caret">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="dropdown-body">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;