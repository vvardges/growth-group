import React, { memo } from 'react';
import styled from 'styled-components';

import { GridItemType, PositionType } from '@/components/MasonryGrid/types';

const Item = styled.div`
  position: absolute;
  color: black;
  overflow: hidden;
  will-change: transform;
  transition: transform 0.2s ease-out;
  border-radius: 5px;
  text-align: center;
`;

interface GridItemProps {
  item: GridItemType;
  position: PositionType;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ item, position }) => {
  return (
    <Item
      key={item.id}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: position.width,
        height: position.height,
        backgroundColor: item.avgColor,
      }}
    >
      <img src={item.src} loading="lazy" alt="" />
    </Item>
  );
};

export default memo(GridItem);
