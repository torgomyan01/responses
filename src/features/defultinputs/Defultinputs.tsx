import React from 'react';
import './DefultInputs.scss';
import Interrogative from '../Interrogative/Interrogative';

function DefaultInputs({
  error = false,
  errorMessage = '',
  placeholder,
  className,
  onChange,
  value,
  title,
  disabled,
  quotation,
  inpProps
}: IDefaultInputs) {
  return (
    <label
      className={`defaultInputs ${className ? className : ''} ${quotation ? 'quotation' : ''} ${
        disabled ? 'opacity-75' : ''
      }`}>
      {title}
      <input
        className={`${error && 'error'}`}
        type="text"
        placeholder={error ? errorMessage : placeholder}
        onChange={onChange}
        disabled={disabled}
        defaultValue={value}
        {...inpProps}
      />
      {quotation && <Interrogative title={quotation.title} text={quotation.text} />}
    </label>
  );
}

export default DefaultInputs;
