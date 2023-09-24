import React from "react";
import "./status-button.css";

/**
 *
 * @param status
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
function StatusButton({ status, text }) {
  return <button className={`btn-status ${status}`}>{text}</button>;
}

export default StatusButton;
