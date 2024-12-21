import { isEqual, isFunction } from 'lodash-es';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import type { GridProps, GridItemType } from '@/components/Grid/types';

import defaultConfigs from '@/components/Grid/configs';
import { computeScrollMetrics } from '@/components/Grid/helpers';
import {
  useColumnSettings,
  useCalculatePositions,
  useScrollToBottom,
} from '@/components/Grid/hooks';

const Item = styled.div`
  position: absolute;
  color: black;
  overflow: hidden;
  will-change: transform;
  transition: transform 0.2s ease-out;
  cursor: pointer;

  &:hover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Grid: React.FC<GridProps> = ({
  items,
  onItemClick,
  onLoadMore,
  gap = defaultConfigs.gap,
  buffer = defaultConfigs.buffer,
  breakpoints = defaultConfigs.breakpoints,
}) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<GridItemType[] | []>([]);
  const isAtBottom = useScrollToBottom(buffer);

  const { columnWidth, columnCount } = useColumnSettings(
    containerElRef,
    gap,
    breakpoints,
  );

  const positions = useCalculatePositions(
    containerElRef,
    items,
    columnWidth,
    columnCount,
    gap,
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

  const updateVisibleItems = useCallback(() => {
    const items = getVisibleItems();
    setVisibleItems((prev: GridItemType[]) =>
      isEqual(items, prev) ? prev : items,
    );
  }, [getVisibleItems]);

  useEffect(() => {
    updateVisibleItems();
  }, [updateVisibleItems]);

  useEffect(() => {
    if (isAtBottom && isFunction(onLoadMore)) {
      onLoadMore();
    }
  }, [isAtBottom, onLoadMore]);

  return (
    <div ref={containerElRef}>
      {visibleItems.map((item: GridItemType) => {
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
