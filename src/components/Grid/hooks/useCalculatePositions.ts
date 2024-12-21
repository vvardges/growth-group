import { throttle } from 'lodash-es';
import React, { useState, useCallback, useEffect } from 'react';

import type {
  GridItemType,
  PositionType,
  GridBreakpoint,
} from '@/components/Grid/types';

import { computeGridPositions } from '@/components/Grid/hooks/helpers';
import useColumnSettings from '@/components/Grid/hooks/useColumnSettings';

/**
 * Custom hook to calculate the positions of grid items in a masonry grid layout.
 * @param containerRef - Reference to the container element.
 * @param items - Array of grid items.
 * @param gap - The gap between columns.
 * @param breakpoints Array of breakpoints
 * @param delay - Throttle delay in milliseconds.
 */
const useCalculatePositions = (
  containerRef: React.RefObject<HTMLDivElement>,
  items: GridItemType[],
  gap: number,
  breakpoints: GridBreakpoint[],
  delay: number = 300,
) => {
  const [positions, setPositions] = useState<Record<string, PositionType>>({});

  const { columnWidth, columnCount } = useColumnSettings(
    containerRef,
    gap,
    breakpoints,
  );

  const updatePositions = useCallback(() => {
    if (!containerRef.current || !columnWidth) return;

    const { positions: newPositions, maxHeight } = computeGridPositions(
      items,
      columnWidth,
      columnCount,
      gap,
    );

    setPositions(newPositions);
    containerRef.current.style.height = `${maxHeight}px`;
  }, [items, columnWidth, columnCount, gap, containerRef]);

  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  useEffect(() => {
    const throttledCallback = throttle(updatePositions, delay);

    window.addEventListener('resize', throttledCallback);

    return () => {
      window.removeEventListener('resize', throttledCallback);
      throttledCallback.cancel();
    };
  }, [updatePositions, delay]);

  return positions;
};

export default useCalculatePositions;
