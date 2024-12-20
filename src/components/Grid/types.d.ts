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
  onClick: () => void;
  alt: string;
}

export interface GridProps {
  items: GridItemType[];
  onLoadMore?: () => void;
  isLoading?: boolean;
  gap?: number;
  buffer?: number;
  breakpoints?: GridBreakpoint[];
}

export interface GridBreakpoint {
  width: number;
  columns: number;
}
