import * as React from 'react';
import styled from '../styled-components';
import { motion, AnimatePresence } from 'framer-motion'
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


  li {
    margin-top: 0.5rem;
  }
`

const ListItem = motion.li

const DropDown = ({ triggerText, listItems, disabled }: DropDownProps) => {
  const [open, toggle] = React.useState(false)

  const onButtonClick = () => {
    toggle(!open)
  }

  return (
    <StyledDropDown>
      <Button onClick={onButtonClick} disabled={disabled}>
        {triggerText}<span className="icon">{open ? '👆' : '👇'}</span>
      </Button>
      <AnimatePresence>
        {open && (
          <DropDownList>
            {listItems.map((listItem, index) => (
              <ListItem
                key={index}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                  y: -8,
                  opacity: 0,
                  transition: {
                    opacity: {
                      duration: 0.2
                    }  
                  }
                }}
                transition={{ delay: 0.075 * index }}
              >
                {listItem}
              </ListItem>
            ))}
          </DropDownList>
        )}
      </AnimatePresence>
    </StyledDropDown>
  )
}

export default DropDown
