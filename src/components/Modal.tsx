import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '../styled-components'
import ReactDOM from 'react-dom'

interface ModalProps {
  show: boolean
  children: React.ReactNode
}

const StyledModal = styled(motion.div)`
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
`

const StyledDialog = styled.dialog`
  background-color: #fff;
  width: 100%;
  max-height: 100%;
  max-width: 30rem;
  position: static;
  border: none;
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadiusLarge};
  display: flex;
  flex-direction: column;
`

const Shade = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
`

const Modal = ({ show, children }: ModalProps) =>
  ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <>
          <Shade
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            key="shade"
          />
          <StyledModal
            key="modal"
            initial={{
              y: 20,
              opacity: 1
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{
              y: 20,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
          >
            <StyledDialog open>{children}</StyledDialog>
          </StyledModal>
        </>
      )}
    </AnimatePresence>,
    document.body
  )

export default Modal
