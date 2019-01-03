import styled from '../../styled-components'

interface TitleProps {
  large: boolean
}

export default styled.div`
  font-size: ${(props: TitleProps) => props.large ? '4rem' : '2rem'};
`