import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

interface GridContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  containerRef,
  children,
}) => {
  return <Container ref={containerRef}>{children}</Container>;
};
