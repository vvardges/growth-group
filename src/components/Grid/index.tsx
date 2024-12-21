import { isEqual, isFunction } from 'lodash-es';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import type { GridProps, GridItemType } from '@/components/Grid/types';

import Item from '@/components/Grid/components/Item';
import defaultConfigs from '@/components/Grid/configs';
import { computeScrollMetrics } from '@/components/Grid/helpers';
import { useCalculatePositions } from '@/components/Grid/hooks';
import useHandleScroll from '@/components/Grid/hooks/useHandleScroll';
import { Container, Content } from '@/components/Grid/styled';

const Grid: React.FC<GridProps> = ({
  items,
  onItemClick,
  onLoadMore,
  gap = defaultConfigs.gap,
  buffer = defaultConfigs.buffer,
  breakpoints = defaultConfigs.breakpoints,
}) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const contentElRef = useRef<HTMLDivElement | null>(null);

  const { scrollTop, clientHeight, bufferHeight, scrollHeight } =
    computeScrollMetrics(containerElRef, buffer);
  const isAtBottom = scrollHeight - scrollTop - clientHeight <= bufferHeight;

  const [visibleItems, setVisibleItems] = useState<GridItemType[]>([]);

  const positions = useCalculatePositions(
    containerElRef,
    contentElRef,
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

  const updateVisibleItems = useCallback(() => {
    const items = getVisibleItems();
    setVisibleItems((prev) => (isEqual(items, prev) ? prev : items));
  }, [getVisibleItems]);

  const handleScroll = useCallback(() => {
    updateVisibleItems();
  }, [updateVisibleItems]);

  useEffect(() => {
    updateVisibleItems();
  }, [updateVisibleItems]);

  useHandleScroll(containerElRef, handleScroll);

  return (
    <Container ref={containerElRef}>
      <Content ref={contentElRef}>
        {visibleItems.map((item: GridItemType) => (
          <Item
            key={item.key}
            item={item}
            position={positions[item.key]}
            onClick={onItemClick}
          />
        ))}
      </Content>
    </Container>
  );
};

export default memo(Grid);
