import React from 'react';

import MasonryGrid from '@/components/MasonryGrid';

const Gallery: React.FC = () => {
  return (
    <div>
      <MasonryGrid
        items={Array(100)
          .fill(0)
          .map((_, index) => {
            return {
              value: <img src="https://picsum.photos/200" alt="" />,
              originalHeight: 200,
              originalWidth: 200,
              key: `${index}`,
            };
          })}
      />
    </div>
  );
};

export default Gallery;
