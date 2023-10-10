import React, { useState } from 'react';
import './select.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { RandomKey } from '../../utils/helpers';

function Select({ selected, className = '', items = [], onChange }: Select) {
  const [value, setValue] = useState<any>(selected);

  function changeSelect(item: any) {
    setValue(item);
    onChange && onChange(item);
  }

  return (
    <div className={`def-select ${className}`}>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          {value ? value : items[0]}
          <i className="fa-solid fa-chevron-down" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item
              key={RandomKey()}
              className={value === item ? 'active' : ''}
              onClick={() => changeSelect(item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Select;
