import react, { useState } from 'react';
import './selectt.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import whatsapp from '../../assets/images/whatcap.svg';
import telegram from '../../assets/images/telegram.svg';
import viber from '../../assets/images/viber.svg';
import React from 'react';

function Select({ title }: Select) {
  const [value, setvalue] = useState<string>('');

  return (
    <div className="select">
      <Dropdown className="DropDown">
        <Dropdown.Toggle className="DropDownBtn" variant="success" id="dropdown-basic">
          {title}
          <i className="fa-solid fa-chevron-down" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="DropDownItem">
          <Dropdown.Item className="DropDownItems">
            <div className="links">
              <img src={whatsapp} alt="whatsapp" />
              <span>Whats App</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="DropDownItems">
            <div className="links">
              <img src={telegram} alt="whatsapp" />
              <span>Telegram</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="DropDownItems">
            <div className="links">
              <img src={viber} alt="whatsapp" />
              <span>Viber</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Select;
