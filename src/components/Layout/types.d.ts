import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  loading: boolean;
  error: string | null;
}
