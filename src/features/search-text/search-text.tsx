import React, { useEffect, useState } from 'react';

interface SearchTextProps {
  placeholder: string;
  onSearchTextChange?: (text: string) => void;
  delayMs?: number;
}

const SearchText: React.FC<SearchTextProps> = ({
  placeholder,
  onSearchTextChange,
  delayMs = 1000
}) => {
  let timer: NodeJS.Timeout;

  const handleChangeText = (text: string): void => {
    if (onSearchTextChange) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        onSearchTextChange(text);
      }, delayMs);
    }
  };

  return (
    <label className="def-search me-5">
      <i className="fa-solid fa-magnifying-glass" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleChangeText(e.target.value)}
      />
    </label>
  );
};

export default SearchText;
