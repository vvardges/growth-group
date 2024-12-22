import React, { memo, useEffect } from 'react';

import { Wrapper, Image } from '@/components/Grid/components/Item/styled';
import { ItemProps } from '@/components/Grid/components/Item/types';

const Item: React.FC<ItemProps> = ({ item, position, onClick }) => {
  const lcpImageUrl = item.src.medium;

  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = lcpImageUrl;
    preloadLink.as = 'image';
    preloadLink.fetchpriority = item.isCritical ? 'high' : 'low'

    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [lcpImageUrl]);

  const { original, large2x, large, medium, small } =
    item.src;

  // Define the srcset with different image sizes
  const imageSrcSet = `
    ${small} 320w, 
    ${medium} 640w, 
    ${large} 940w, 
    ${large2x} 2x, 
    ${original} 2000w
  `;

  // Define sizes based on the breakpoints
  const imageSizes = `
    (max-width: 320px) 100vw, 
    (max-width: 768px) 50vw, 
    (max-width: 1024px) 33vw, 
    (max-width: 1200px) 25vw, 
    (max-width: 1920px) 20vw, 
    100vw
  `;

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
        fetchPriority={item.isCritical ? 'high' : 'low'}
        alt={item.alt}
        srcSet={imageSrcSet}
        sizes={imageSizes}
      />
    </Wrapper>
  );
};

export default memo(Item);
