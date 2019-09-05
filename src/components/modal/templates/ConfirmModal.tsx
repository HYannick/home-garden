import React from 'react';
import styled from '@emotion/styled';
import Spacer from '../../../layout/Spacer';
import { VariantProps } from '../../../interfaces';

interface ConfirmModalProps {
  onConfirm: Function,
  onCancel: Function,
  title: string,
  subtitle?: string
}

const ModalContent: any = styled('div')`
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 2rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey.light};
`;

ModalContent.Title = styled('h2')`
  font-size: 3rem;
  margin: 0;
  color: ${({ theme }) => theme.palette.grey.dark};
`;
ModalContent.SubTitle = styled('p')`
  margin: 2rem 0;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.palette.grey.dark};
`;
ModalContent.Button = styled('button')<VariantProps>`
  background-color:  ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
  color: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  border: 0.1rem solid ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  border-radius: 3rem;
  padding: 1rem 3rem;
  width: 15rem;
  font-size: 1.5rem;
  font-weight: bold;
  position: relative;
  outline: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  transition: 0.1s;
`;

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel, title, subtitle }) => {
  return (
    <ModalContent>
      <ModalContent.Title>
        {title}
      </ModalContent.Title>
      <ModalContent.SubTitle>
        {subtitle}
      </ModalContent.SubTitle>
      <ModalContent.Button variant="primary" onClick={onConfirm}>Yes, please</ModalContent.Button>
      <Spacer height={1}/>
      <ModalContent.Button variant="danger" onClick={onCancel}>Nooo!</ModalContent.Button>
    </ModalContent>
  );
};

export default ConfirmModal;
