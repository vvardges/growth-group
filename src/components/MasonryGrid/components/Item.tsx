import React, { memo } from 'react';
import styled from 'styled-components';

import { GridItemType, PositionType } from '@/components/MasonryGrid/types';

const Item = styled.div`
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: black;
  overflow: hidden;
  will-change: transform;
  transition: transform 0.2s ease-out;
`;

interface GridItemProps {
  item: GridItemType;
  position: PositionType;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ item, position }) => {
  return (
    <Item
      key={item.key}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: position.width,
        height: position.height,
      }}
    >
      {item.value}
    </Item>
  );
};

export default memo(GridItem);
