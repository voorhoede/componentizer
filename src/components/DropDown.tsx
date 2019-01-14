import * as React from 'react';
import styled from '../styled-components';
import posed, { PoseGroup } from 'react-pose';
import Button from './styled-components/Button';

interface DropDownProps {
  triggerText: string
  listItems: React.ReactNode[]
  disabled: boolean
}

const StyledDropDown = styled.div`
  position: relative;
`

const DropDownList = styled(posed.ul({
  open: {
    staggerChildren: 75,
    delayChildren: 50,
  },
  closed: {
    staggerChildren: 75,
    delayChildren: 50,
    staggerDirection: -1
  }
}))`
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

const transition = {
  y: { type: 'spring', stiffness: 500, damping: 20   },
  default: { duration: 300 }
}

const ListItem = posed.li({
  open: {
    y: 0,
    opacity: 1,
    transition
  },
  closed: {
    y: -8,
    opacity: 0,
    transition
  }
})

const DropDown = ({ triggerText, listItems, disabled }: DropDownProps) => {
  const [open, toggle] = React.useState(true)

  return (
    <StyledDropDown>
      <Button onClick={() => toggle(!open)} disabled={disabled}>
        {triggerText}<span className="icon">{open ? '👆' : '👇'}</span>
      </Button>
      <DropDownList initialPose="closed" pose={open ? 'open' : 'closed'}>
        {
          listItems.map((listItem, index) => (
            <ListItem key={index}>
              {listItem}
            </ListItem>
          ))
        }
      </DropDownList>
    </StyledDropDown>
  )
}

export default DropDown