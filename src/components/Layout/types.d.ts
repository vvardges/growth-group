import { ReactNode } from 'react';

export interface LayoutProps {
  children?: ReactNode | null;
  loading?: boolean;
  error: string | null;
}
