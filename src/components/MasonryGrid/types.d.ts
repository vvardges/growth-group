import React from 'react';

export interface PositionType {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridItemType {
  value?: React.ReactNode;
  key: string;
  originalWidth: number;
  originalHeight: number;
}

export interface MasonryGridProps {
  items: GridItemType[];
  gap?: number;
  virtualizationBuffer?: number;
  breakpoints?: GridBreakpoint[];
}

export interface GridBreakpoint {
  width: number;
  columns: number;
}
