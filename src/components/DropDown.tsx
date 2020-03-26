import * as React from 'react';
import styled, { css } from '../styled-components';
import { motion } from 'framer-motion'
import Button from './styled-components/Button';

interface DropDownProps {
  triggerText: string
  listItems: React.ReactNode[]
  disabled: boolean
}

const StyledDropDown = styled.div`
  position: relative;
`

const DropDownList = styled(motion.ul)`
  list-style: none;
  position: absolute;
  right: 0;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  /* ${(props: { hide: boolean }) => props.hide && css`
    display: none;
    `} */

  li {
    margin-top: 0.5rem;
  }
`

const transition = {
  y: { type: 'spring', stiffness: 500, damping: 20   },
  default: { duration: 0.3 }
}

const ListItem = motion.li

const DropDown = ({ triggerText, listItems, disabled }: DropDownProps) => {
  const [open, toggle] = React.useState(false)
  const [show, setShow] = React.useState(false)

  const handleAnimationComplete = () => {
    if (open) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const onButtonClick = () => {
    if (!open) setShow(true)

    toggle(!open)
  }

  return (
    <StyledDropDown>
      <Button onClick={onButtonClick} disabled={disabled}>
        {triggerText}<span className="icon">{open ? '👆' : '👇'}</span>
      </Button>

      <DropDownList
        initial="closed"
        animate={show ? 'open' : 'closed'}
        onAnimationComplete={() => handleAnimationComplete()}
        hide={!open && !show}
        variants={{
          open: {
            transition: {
              delayChildren: 0.05,
              staggerChildren: 0.01,
            },
          },
          closed: {
            transition: {
              staggerChildren: 0.075,
              delayChildren: 0.05,
            }
          }
        }}
      >
        {
          listItems.map((listItem, index) => (
            <ListItem
              key={index}
              variants={{
                open: {
                  y: 0,
                  opacity: 1,
                  transition,
                },
                closed: {
                  y: -8,
                  opacity: 0,
                  transition,
                }
              }}
            >
              {listItem}
            </ListItem>
          ))
        }
      </DropDownList>
    </StyledDropDown>
  )
}

export default DropDown
