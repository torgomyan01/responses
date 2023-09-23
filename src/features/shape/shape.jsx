import React from "react";
import "./shape.css";
import updateButton from "../../assets/images/update-button.svg";

function Shape() {
  return (
    <div className="shape">
      <div className="shape-item">
        <i className="fa-regular fa-gift me-2" />
        Список товаров
      </div>
      <div className="shape-item green">
        <i className="fa-regular fa-message-lines fa-flip-horizontal me-2" />
        Список товаров
      </div>
      <img src={updateButton} alt="updateButton" className="cursor-pointer" />
    </div>
  );
}

export default Shape;
