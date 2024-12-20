import React from 'react';
import styled from 'styled-components';
import Loader from '@/components/Loader';

const Error = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Layout: React.FC<{
  children: React.ReactNode;
  loading: boolean;
  error: string | null;
}> = ({ loading, error, children }) => {
  console.log(loading);
  return (
    <>
      {loading && <Loader />}
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
