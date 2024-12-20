import { throttle } from 'lodash-es';
import { useState, useCallback, useEffect } from 'react';

import { computeGridPositions } from '@/components/Grid/helpers';
import type { GridItemType, PositionType } from '@/components/Grid/types';

/**
 * Custom hook to calculate the positions of grid items in a masonry grid layout.
 * @param containerRef - Reference to the container element.
 * @param items - Array of grid items.
 * @param columnWidth - The width of each column.
 * @param columnCount - The number of columns.
 * @param gap - The gap between columns.
 * @param delay - Throttle delay in milliseconds.
 */
const useCalculatePositions = (
  containerRef: React.RefObject<HTMLDivElement>,
  items: GridItemType[],
  columnWidth: number,
  columnCount: number,
  gap: number,
  delay: number = 300,
) => {
  const [positions, setPositions] = useState<Record<string, PositionType>>({});

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
