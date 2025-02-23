const Dropdown = ({ options, selected, onSelectedChange }) => {
  const renderedOptions = options.map((option, index) => (
    <div 
      key={option.value || `${option.label}-${index}`} 
      className="item" 
      onClick={() => onSelectedChange(option)}
    >
      <button
        style={{
          backgroundColor: "",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "blue")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
      >
        {option.label}
      </button>
    </div>
  ));

  return (
    <div className="ui form">
      <div className="field">
        <div className="ui selection dropdown visible active">
          <i className="dropdown icon"></i>
          <div className="menu visible transition">{renderedOptions}</div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
