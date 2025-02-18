import React from 'react';

export default function TextBox({ type = "text", value, onChange, placeholder }) {
  return (
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}