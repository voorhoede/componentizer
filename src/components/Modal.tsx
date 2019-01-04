import * as React from 'react';
import styled from '../styled-components'

interface ModalProps {
  show: boolean
  children: React.ReactNode
}

const StyledModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDialog = styled.dialog`
  width: 100%;
  max-width: 30rem;
  position: static;
  border: none;
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadiusLarge};
`;

const Modal: React.SFC<ModalProps> = ({ show, children }) => {
  return show ? (
    <StyledModal>
      <StyledDialog open>
        {children}
      </StyledDialog>
    </StyledModal>
  ) : null
};

export default Modal