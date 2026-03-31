import React from 'react';
import './Input.css';

const Input = ({ icon, className = '', containerStyle = {}, ...props }) => {
  return (
    <div style={containerStyle} className={`input-container ${className}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input
        className="input-field"
        {...props}
      />
    </div>
  );
};

export default Input;
