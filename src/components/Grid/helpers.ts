import { RefObject } from 'react';

import { GridItemType, PositionType } from '@/components/Grid/types';

/**
 * Compute scroll metrics for a given container element.
 * @param ref - The ref of the container element.
 * @param buffer - The buffer percentage for the scroll height.
 */
export const computeScrollMetrics = (
  ref: RefObject<HTMLDivElement>,
  buffer: number,
) => {
  if (!ref.current)
    return { scrollTop: 0, clientHeight: 0, bufferHeight: 0, scrollHeight: 0 };

  const scrollTop = ref.current.scrollTop;
  const clientHeight = ref.current.clientHeight;
  const bufferHeight = (buffer / 100) * clientHeight;
  const scrollHeight = ref.current.scrollHeight;

  return { scrollTop, clientHeight, bufferHeight, scrollHeight };
};

/**
 * Computes the positions of grid items in a masonry grid layout.
 * @param items - Array of grid items.
 * @param columnWidth - The width of each column.
 * @param columnCount - The number of columns.
 * @param gap - The gap between columns.
 */
export const computeGridPositions = (
  items: GridItemType[],
  columnWidth: number,
  columnCount: number,
  gap: number,
): { positions: Record<string, PositionType>; maxHeight: number } => {
  const columnHeights = new Array(columnCount).fill(0);
  const positions: Record<string, PositionType> = {};

  for (const item of items) {
    const height = Number((columnWidth / item.aspectRatio).toFixed(2));
    const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const x = Number((minColumnIndex * (columnWidth + gap)).toFixed(2));
    const y = Number(columnHeights[minColumnIndex].toFixed(2));

    positions[item.key] = {
      x,
      y,
      width: columnWidth,
      height: height,
    };

    columnHeights[minColumnIndex] += height + gap;
  }

  const maxHeight = Math.max(...columnHeights);
  return { positions, maxHeight };
};
