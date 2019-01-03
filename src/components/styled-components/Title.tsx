import styled from '../../styled-components'

interface TitleProps {
  large?: boolean
}

export default styled.h1`
  font-size: ${(props: TitleProps) => props.large ? '3rem' : '1.5rem'};
  margin: ${(props: TitleProps) => props.large ? '1.5rem' : '0.5rem'}
`