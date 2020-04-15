import * as React from 'react'
import styled from '../styled-components'
import Button from './styled-components/Button'
import ModalFooter from './styled-components/ModalFooter'
import Form from './styled-components/Form'
import { Region } from './ImageEditor'
import Downshift from 'downshift'

interface ComponentFormProps {
  onSubmit: Function
  onCancel: Function
  region?: Region
  names: string[]
}

const StyledForm = styled(Form)`
  width: 100%;
`

const ComponentForm = ({
  onSubmit,
  region,
  onCancel,
  names,
}: ComponentFormProps) => {
  let nameInputRef = React.useRef<HTMLInputElement>(null)

  const [state, updateState] = React.useState({
    name: region ? region.data.name : '',
    description: region ? region.data.description : '',
    index: region && region.data.index,
  })

  const onInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const { name, value } = e.currentTarget
    updateState((prevState) => ({ ...prevState, [name]: value }))
  }

  React.useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus()
  }, [])

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ ...state })
      }}
    >
      <Downshift
        itemToString={(names) => names}
        onChange={(selection) => updateState({ ...state, name: selection })}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div style={{ position: 'relative' }}>
            <label {...getLabelProps()}>Name</label>
            <input
              {...getInputProps({
                id: 'name',
                name: 'name',
                value: state.name || '',
                onChange: onInput,
                ref: nameInputRef,
              })}
            />
            <ul className="autosuggestions" {...getMenuProps()}>
              {isOpen && state.name
                ? names
                    .filter(
                      (name) =>
                        !inputValue ||
                        name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((name, index) => (
                      <li
                        {...getItemProps({
                          key: name,
                          index,
                          item: name,
                          className:
                            highlightedIndex === index ? 'selected' : '',
                        })}
                      >
                        {name}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>

      <label htmlFor="description">
        Description <span className="info">(not required)</span>
      </label>
      <textarea
        name="description"
        id="description"
        value={state.description}
        onChange={onInput}
        onKeyPress={(e) => {
          var code = e.keyCode ? e.keyCode : e.which

          if (code === 13 && !e.shiftKey && state.name) {
            onSubmit({ ...state })
          }
        }}
      />

      <ModalFooter>
        <Button
          type="button"
          onClick={() => onCancel(region && region.data.index)}
        >
          Cancel
        </Button>
        <Button disabled={Boolean(!state.name)}>
          Save{' '}
          <span className="icon" role="img" aria-label="floppy disk">
            💾
          </span>
        </Button>
      </ModalFooter>
    </StyledForm>
  )
}

export default ComponentForm
