import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

const Input = styled.input`
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
  const debounceTimer = useRef<number | null>(null);

  const handleChange = useCallback(
    (query: string) => {
      if (debounceTimer.current !== null) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        onSubmit(query);
      }, 500);

      return () => {
        if (debounceTimer.current !== null) {
          clearTimeout(debounceTimer.current);
        }
      };
    },
    [onSubmit],
  );

  return (
    <Input
      type="text"
      placeholder="Search..."
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Search;
