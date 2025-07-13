import React from 'react';
import '../css/Dropdown.css';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const renderedOptions = options.map((option, index) => (
    <div 
      key={option.value || `${option.label}-${index}`} 
      className="item" 
      onClick={() => onSelectedChange(option)}
    >
      <button
        className={`dropdown-button ${selected && selected.value === option.value ? 'selected' : ''}`}
      >
        {option.label}
      </button>
    </div>
  ));

  return (
    <div className="dropdown-container">
      <div className="ui form">
        <div className="field">
          <div className="ui selection dropdown visible active">
            <i className="dropdown icon"></i>
            <div className="menu visible transition">{renderedOptions}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;