import React from 'react';
import './DefultInputs.css';

function DefaultInputs({
  error = false,
  errorMessage = '',
  placeholder,
  className,
  onChange,
  value,
  title,
  inpProps
}: IDefaultInputs) {
  return (
    <label className={`defaultInputs ${className}`}>
      {title}
      <input
        className={`${error && 'error'}`}
        type="email"
        placeholder={error ? errorMessage : placeholder}
        onChange={onChange}
        defaultValue={value}
        {...inpProps}
      />
    </label>
  );
}

export default DefaultInputs;
