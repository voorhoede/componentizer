import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from '../styled-components'

interface ModalProps {
  show: boolean
  children: React.ReactNode
}

const StyledModal = styled(posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 50,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 20   },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 100 }
  }
}))`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 201;
  overflow: hidden;
`;

const StyledDialog = styled.dialog`
  background-color: #fff;
  width: 100%;
  max-height: 100%;
  max-width: 30rem;
  position: static;
  border: none;
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadiusLarge};
  overflow-y: auto;
`;

const Shade = styled(posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}))`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  overflow: hidden;
`;

const Modal: React.SFC<ModalProps> = ({ show, children }) => (
  <PoseGroup>
    {
      show &&  [
        <Shade key="shade"/>,
        <StyledModal key="modal">
          <StyledDialog open>
            {children}
          </StyledDialog>
        </StyledModal>
      ]
    }    
  </PoseGroup>
);

export default Modal