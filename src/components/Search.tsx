import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  top: 5px;
  width: 100%;
  height: 50px;
  z-index: 2;
  font-size: 30px;
  background: transparent;
  border: none;
  outline: none;
  color: white;
`;

const Search: React.FC<{
  onSubmit: (value: string) => void;
}> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  let debounceTimer: number;
  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSubmit(query);
    }, 0);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <Input
      type="text"
      value={query}
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
