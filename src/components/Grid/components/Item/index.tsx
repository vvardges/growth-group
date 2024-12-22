import React, { memo, useEffect } from 'react';

import { Wrapper, Image } from '@/components/Grid/components/Item/styled';
import { ItemProps } from '@/components/Grid/components/Item/types';

const Item: React.FC<ItemProps> = ({ item, position, onClick }) => {
  const { original, large2x, large, medium, small } = item.src;
  const lcpImageUrl = medium;

  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = lcpImageUrl;
    preloadLink.as = 'image';
    preloadLink.fetchPriority = item.isCritical ? 'high' : 'low';

    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [original]);

  return (
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
      <Image
        src={lcpImageUrl}
        loading={item.isCritical ? 'eager' : 'lazy'}
        srcSet={`${small} 600w, ${medium} 1200w, ${large} 1800w, ${large2x} 2400w`}
        sizes="(max-width: 600px) 600px, (max-width: 1200px) 1200px, 1800px"
        alt={item.alt}
      />
    </Wrapper>
  );
};

export default memo(Item);
