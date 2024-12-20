import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 70vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh;
`;

const Image = styled.img`
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
`;

const Content = styled.div`
  padding: 16px;
  position: absolute;
  bottom: -10px;
  text-align: center;
`;

const Photographer = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: white;
`;

const Close = styled.button`
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

export interface CardProps {
  imageUrl: string;
  photographerName: string;
  photographerLink: string;
  description?: string;
  onClose: () => void | Promise<void>;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  photographerName,
  photographerLink,
  description,
  onClose,
}) => {
  return (
    <Container>
      <Image src={imageUrl} alt={description} />
      <Content>
        {description && <Description>{description}</Description>}
        <Photographer href={photographerLink} target="_blank">
          {photographerName}
        </Photographer>
      </Content>
      <Close onClick={onClose}>×</Close>
    </Container>
  );
};

export default Card;
