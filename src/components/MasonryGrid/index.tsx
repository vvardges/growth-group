import React, { memo, useCallback, useRef } from 'react';

import { GridContainer, GridItem } from '@/components/MasonryGrid/components';
import defaultConfigs from '@/components/MasonryGrid/configs';
import { computeScrollMetrics } from '@/components/MasonryGrid/helpers';
import {
  useColumnSettings,
  useCalculatePositions,
} from '@/components/MasonryGrid/hooks';
import { MasonryGridProps } from '@/components/MasonryGrid/types';

const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  gap = defaultConfigs.gap,
  virtualizationBuffer = defaultConfigs.buffer,
  breakpoints = defaultConfigs.breakpoints,
}) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);

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
      virtualizationBuffer,
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
  }, [containerElRef, items, positions, virtualizationBuffer]);

  return (
    <GridContainer containerRef={containerElRef}>
      {getVisibleItems().map((item) => {
        const pos = positions[item.key];
        return <GridItem key={item.key} item={item} position={pos} />;
      })}
    </GridContainer>
  );
};

export default memo(MasonryGrid);
