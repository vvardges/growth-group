import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 70vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh;
`;

export const Image = styled.img`
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
`;

export const Content = styled.div`
  padding: 16px;
  position: absolute;
  bottom: -10px;
  text-align: center;
`;

export const Photographer = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: white;
`;

export const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  color: #aaa;
  cursor: pointer;
  padding: 8px;
  &:hover {
    color: blue;
  }
`;
