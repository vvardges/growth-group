import React, { memo } from 'react';

import { ItemProps } from './types';

import { Wrapper, Image } from '@/components/Grid/components/Item/styled';

const Item: React.FC<ItemProps> = ({ item, position, onClick }) => (
  <Wrapper
    key={item.key}
    style={{
      transform: `translate(${position.x}px, ${position.y}px)`,
      width: position.width,
      height: position.height,
      background: item.avgColor,
    }}
    onClick={() => onClick(item.id)}
  >
    <Image src={item.src} loading="lazy" alt={item.alt} />
  </Wrapper>
);

export default memo(Item);