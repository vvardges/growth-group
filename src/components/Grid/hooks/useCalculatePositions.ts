import { throttle } from 'lodash-es';
import React, { useState, useCallback, useEffect } from 'react';

import type {
  GridItemType,
  PositionType,
  GridBreakpoint,
} from '@/components/Grid/types';

import { computeGridPositions } from '@/components/Grid/helpers';
import useColumnSettings from '@/components/Grid/hooks/useColumnSettings';

const useWindowResize = (callback: () => void, delay: number = 50) => {
  useEffect(() => {
    const throttledCallback = throttle(callback, delay);

    window.addEventListener('resize', throttledCallback);

    return () => {
      window.removeEventListener('resize', throttledCallback);
      throttledCallback.cancel();
    };
  }, [callback, delay]);
};

/**
 * Custom hook to calculate the positions of grid items in a masonry grid layout.
 * @param containerRef - Reference to the container element.
 * @param contentRef - Reference to the content element.
 * @param items - Array of grid items.
 * @param gap - The gap between columns.
 * @param breakpoints
 * @param delay - Throttle delay in milliseconds.
 */
const useCalculatePositions = (
  containerRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
  items: GridItemType[],
  gap: number,
  breakpoints: GridBreakpoint[],
  delay: number = 50,
) => {
  const [positions, setPositions] = useState<Record<string, PositionType>>({});

  const { columnWidth, columnCount } = useColumnSettings(
    containerRef,
    gap,
    breakpoints,
  );

  const updatePositions = useCallback(() => {
    if (!containerRef.current || !contentRef.current || !columnWidth) return;

    const { positions: newPositions, maxHeight } = computeGridPositions(
      items,
      columnWidth,
      columnCount,
      gap,
    );

    setPositions(newPositions);
    contentRef.current.style.height = `${maxHeight}px`;
  }, [items, columnWidth, columnCount, gap, containerRef, contentRef]);

  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  useWindowResize(updatePositions, delay);

  return positions;
};

export default useCalculatePositions;
