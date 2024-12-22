import React, { memo, useEffect } from 'react';

import { Wrapper, Image } from '@/components/Grid/components/Item/styled';
import { ItemProps } from '@/components/Grid/components/Item/types';

const Item: React.FC<ItemProps> = ({ item, position, onClick }) => {
  const lcpImageUrl = item.src; // Your LCP image URL

  useEffect(() => {
    // Create a <link> tag to preload the LCP image
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = lcpImageUrl;
    preloadLink.as = 'image';

    // Append the preload link to the <head>
    document.head.appendChild(preloadLink);

    // Cleanup: Remove the link tag when the component unmounts
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [lcpImageUrl]);

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
      <Image src={lcpImageUrl} loading={item.isCritical ? "eager" : "lazy"} alt={item.alt} />
    </Wrapper>
  )
};

export default memo(Item);
