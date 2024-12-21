import { isFunction } from 'lodash-es';
import React, { memo, useCallback, useEffect, useRef } from 'react';

import type { GridProps, GridItemType } from '@/components/Grid/types';

import defaultConfigs from '@/components/Grid/configs';
import { computeScrollMetrics } from '@/components/Grid/helpers';
import {
  useCalculatePositions,
  useScrollToBottom,
} from '@/components/Grid/hooks';
import { Item, Image } from '@/components/Grid/styled';

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

  const getVisibleItems = useCallback(() => {
    const { scrollTop, clientHeight, bufferHeight } = computeScrollMetrics(
      containerElRef,
      buffer,
    );
    const viewportBottomWithBuffer = scrollTop + clientHeight + bufferHeight;

    return items.filter((item) => {
      const pos = positions[item.key];
      return (
        pos &&
        pos.y + pos.height > scrollTop - bufferHeight &&
        pos.y < viewportBottomWithBuffer
      );
    });
  }, [containerElRef, items, positions, buffer]);

  useEffect(() => {
    if (isAtBottom && isFunction(onLoadMore)) {
      onLoadMore();
    }
  }, [isAtBottom, onLoadMore]);

  return (
    <div ref={containerElRef}>
      {getVisibleItems().map((item: GridItemType) => {
        const position = positions[item.key];
        return (
          <Item
            key={item.key}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              width: position.width,
              height: position.height,
              background: item.avgColor,
            }}
            onClick={() => onItemClick(item.id)}
          >
            <Image src={item.src} loading="lazy" alt={item.alt} />
          </Item>
        );
      })}
    </div>
  );
};

export default memo(Grid);
