import styled from '../../styled-components'

interface TitleProps {
  large?: boolean
  oldSchool?: boolean
}

export default styled.h1`
  font-size: ${(props: TitleProps) => props.large ? '3rem' : '1.5rem'};
  margin-bottom: 1rem;
`

export const OldSchoolTitle = styled.h1`
  padding: 0 1rem;
  font-family: 'Lazer84';
  font-size: 5vw;
  margin-bottom: 5rem;
  color: rgba(230,65,247,1);
  background: linear-gradient(356deg, rgba(230,65,247,1) 0%, rgba(148,34,127,1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.25rem;
  transform: rotate(-3deg)
`