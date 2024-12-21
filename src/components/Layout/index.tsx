import React from 'react';

import type { LayoutProps } from '@/components/Layout/types';

import { Error } from '@/components/Layout/styled';
import Loader from '@/components/Loader';

const Layout: React.FC<LayoutProps> = ({
  loading = false,
  error,
  children,
}) => {
  return (
    <>
      <Loader loading={loading} />
      {error && (
        <Error>
          Oops! Something went wrong! Please refresh the page. <br /> Error
          message: {error}
        </Error>
      )}
      {children}
    </>
  );
};

export default Layout;
