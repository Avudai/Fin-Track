import React from 'react';
import "./style.css";

function Button({text, onClick, blue, disabled}) {
  return (
    <div className="btn btn-blue" 
        onClick={onClick}
        disabled={disabled}
        >
        {text}
    </div>
  )
}

export default Button;