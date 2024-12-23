import React, { memo } from 'react';

import {
  Wrapper,
  Image as StyledImage,
} from '@/components/Grid/components/Item/styled';
import { ItemProps } from '@/components/Grid/components/Item/types';

const Item: React.FC<ItemProps> = ({ item, position, onClick }) => {
  const { large, medium, small } = item.src;

  const srcSet = `${small} 150h, ${medium} 350h, ${large} 940w`;
  const sizes = '(max-width: 600px) 300px, 600px';

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={medium}
        imageSrcSet={srcSet}
        imageSizes={sizes}
      />
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
        <StyledImage
          src={medium}
          loading={item.isCritical ? 'eager' : 'lazy'}
          srcSet={srcSet}
          sizes={sizes}
          alt={item.alt}
        />
      </Wrapper>
    </>
  );
};

export default memo(Item);
