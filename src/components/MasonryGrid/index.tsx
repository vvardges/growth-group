import React, { memo, useCallback, useRef } from 'react';

import defaultConfigs from '@/components/MasonryGrid/configs';
import { computeScrollMetrics } from '@/components/MasonryGrid/helpers';
import {
  useColumnSettings,
  useCalculatePositions,
} from '@/components/MasonryGrid/hooks';
import { MasonryGridProps } from '@/components/MasonryGrid/types';
import styled from 'styled-components';

const Item = styled.div`
  position: absolute;
  color: black;
  overflow: hidden;
  will-change: transform;
  transition: transform 0.2s ease-out;
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
      const pos = positions[item.id];
      return (
        pos &&
        pos.y + pos.height > scrollTop - bufferHeight &&
        pos.y < viewportBottomWithBuffer
      );
    });
  }, [containerElRef, items, positions, virtualizationBuffer]);

  return (
    <div ref={containerElRef}>
      {getVisibleItems().map((item) => {
        const position = positions[item.id];
        return (
          <Item
            key={item.id}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              width: position.width,
              height: position.height,
              background: item.avgColor,
            }}
          >
            <Image src={item.src} loading="lazy" alt="" />
          </Item>
        );
      })}
    </div>
  );
};

export default memo(MasonryGrid);
