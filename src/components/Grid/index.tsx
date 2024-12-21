import { isFunction } from 'lodash-es';
import React, { memo, useEffect, useRef } from 'react';

import type { GridProps, GridItemType } from '@/components/Grid/types';

import Item from '@/components/Grid/components/Item';
import defaultConfigs from '@/components/Grid/configs';
import {
  useCalculatePositions,
  useScrollToBottom,
} from '@/components/Grid/hooks';

const Grid: React.FC<GridProps> = ({
  items,
  onItemClick,
  onLoadMore,
  gap = defaultConfigs.gap,
  buffer = defaultConfigs.buffer,
  breakpoints = defaultConfigs.breakpoints,
}) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const isAtBottom = useScrollToBottom(buffer);

  const positions = useCalculatePositions(
    containerElRef,
    items,
    gap,
    breakpoints,
  );

  useEffect(() => {
    if (isAtBottom && isFunction(onLoadMore)) {
      onLoadMore();
    }
  }, [isAtBottom, onLoadMore]);

  return (
    <div ref={containerElRef}>
      {items.map((item: GridItemType) => {
        const position = positions[item.key];
        return (
          position && (
            <Item
              key={item.key}
              item={item}
              position={position}
              onClick={onItemClick}
            />
          )
        );
      })}
    </div>
  );
};

export default memo(Grid);
