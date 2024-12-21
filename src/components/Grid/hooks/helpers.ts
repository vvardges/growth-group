import type { GridItemType, PositionType } from '@/components/Grid/types';

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
