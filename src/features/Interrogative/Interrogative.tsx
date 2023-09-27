import React, { useState } from 'react';
import './Interrogative.css';

function Interrogative({ text, title, className }: IInterrogative) {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  return (
    <div className={`interrogative ${className}`}>
      <i className="fa-regular fa-circle-question" onClick={() => setOpenTooltip(!openTooltip)} />
      {openTooltip && (
        <div className="interrogative-tooltip">
          <i className="fa-regular fa-xmark c-grey" onClick={() => setOpenTooltip(false)} />
          <div className="interrogative-tooltip-title">{title}</div>
          <p className="interrogative-tooltip-text">{text}</p>
        </div>
      )}
    </div>
  );
}

export default Interrogative;
