import React from 'react';
import './DefultInputs.css';

function DefaultInputs({
  error = false,
  errorMessage = '',
  placeholder,
  className,
  onChange
}: IDefaultInputs) {
  return (
    <label className="defaultInputs">
      <input
        className={`${error && 'error'} ${className}`}
        type="email"
        placeholder={error ? errorMessage : placeholder}
        onChange={onChange}
      />
    </label>
  );
}

export default DefaultInputs;
