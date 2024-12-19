export interface PositionType {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridItemType {
  src: string;
  id: number;
  aspectRatio: number;
  avgColor: string;
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
