import type { GridItemType, PositionType } from '@/components/Grid/types';

export interface ItemProps {
  item: GridItemType;
  position: PositionType;
  onClick: (id: number) => void;
}
