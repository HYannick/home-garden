import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { Overlay } from '../Overlay';
import CrossIcon from '../../core/svg/Cross';

const ModalContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
`;
const ModalBody = styled('div')`
  position: relative;
  z-index: 30;
  > div {
    position: fixed;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CloseButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 1rem;
  right: 1rem;
  border: none;
  width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  background-color:  ${({ theme }) => theme.palette.danger.light};
  outline: ${({ theme }) => theme.palette.light};
  cursor: pointer;
  svg {
    width: 4rem;
    height: 4rem;
    path {
      fill: ${({ theme }) => theme.palette.danger.dark}
    }
  }
`;


const Modal: React.FC<any> = ({ template: ModalContent, onClose, isOpen }) => {
  return isOpen && ReactDOM.createPortal(
    <ModalContainer>
      <Overlay onClick={onClose} color="#FFF" opacity={0.95}/>
      <CloseButton onClick={onClose}><CrossIcon/></CloseButton>
      <ModalBody>
        <ModalContent />
      </ModalBody>
    </ModalContainer>,
    document.body,
  );
};

export default Modal;
