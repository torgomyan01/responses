import React from 'react';
import './DefultInputs.css';
import Interrogative from '../Interrogative/Interrogative';

function DefaultInputs({
  error = false,
  errorMessage = '',
  placeholder,
  className,
  onChange,
  value,
  title,
  quotation,
  inpProps
}: IDefaultInputs) {
  return (
    <label
      className={`defaultInputs ${className ? className : ''} ${quotation ? 'quotation' : ''}`}>
      {title}
      <input
        className={`${error && 'error'}`}
        type="text"
        placeholder={error ? errorMessage : placeholder}
        onChange={onChange}
        defaultValue={value}
        {...inpProps}
      />
      {quotation && <Interrogative title={quotation.title} text={quotation.text} />}
    </label>
  );
}

export default DefaultInputs;
