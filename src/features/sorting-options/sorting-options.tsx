import React, { useState } from 'react';
import './sorting-options.scss';
import { Dropdown } from 'react-bootstrap';

interface Item {
  title: string;
  sort: Array<string>;
}

interface SortingOptionsProps {
  items: Item[];
  onSelect?: (sort: Array<string>) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ items, onSelect }) => {
  const [selectedTitle, setSelectedTitle] = useState<string>(items[0].title);

  const handleSelect = (item: Item) => {
    if (onSelect) {
      setSelectedTitle(item.title);
      onSelect(item.sort);
    }
  };

  return (
    <Dropdown className="sorting-select ">
      <Dropdown.Toggle variant="outline-dark text-start">
        {selectedTitle}
        <i className="fa-regular fa-chevron-down ms-2 trans" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handleSelect(item)}>
            {item.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default SortingOptions;
