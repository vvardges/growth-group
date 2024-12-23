export interface PositionType {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridItemType {
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
  id: number;
  key: string;
  aspectRatio: number;
  avgColor: string;
  onClick: () => void;
  alt: string;
  isCritical?: boolean;
}

export interface GridProps {
  items: GridItemType[];
  onItemClick: (id: number) => void;
  onLoadMore?: () => void;
  gap: number;
  buffer: number;
  breakpoints: GridBreakpoint[];
}

export interface GridBreakpoint {
  width: number;
  columns: number;
}
