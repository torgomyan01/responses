import React, { useState } from 'react';
import './sorting-select.scss';
import { Dropdown } from 'react-bootstrap';
import { RandomKey } from '../../utils/helpers';

function SortingSelect({ items }: SortingSelect) {
  const [selectValue, setSelectValue] = useState<string>(items[0]);
  const changeSelect = (value: string) => setSelectValue(value);
  return (
    <Dropdown className="sorting-select ">
      <Dropdown.Toggle variant="outline-dark text-start">
        {selectValue}
        <i className="fa-regular fa-chevron-down ms-2 trans" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item key={RandomKey()} onClick={() => changeSelect(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default SortingSelect;
