import React from 'react';
import './status-button.css';

function StatusButton({ status, text }: StatusButton) {
  return <button className={`btn-status ${status}`}>{text}</button>;
}

export default StatusButton;
