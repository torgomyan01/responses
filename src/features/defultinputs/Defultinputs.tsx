import React from 'react';
import './DefultInputs.css';

function DefaultInputs({
  error = false,
  errorMessage = '',
  placeholder,
  onChange
}: IDefaultInputs) {
  console.log(error);
  return (
    <div className="defaultInputs">
      <input
        className={`defaultInput ${error && 'error'}`}
        type="email"
        placeholder={error ? errorMessage : placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default DefaultInputs;
