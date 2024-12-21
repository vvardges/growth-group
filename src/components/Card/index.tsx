import React from 'react';
import {
  Close,
  Image,
  Container,
  Content,
  Description,
  Photographer,
} from '@/components/Card/styled';
import { CardProps } from '@/components/Card/types';

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
