import Styled from "styled-components"

const HeaderLvl2Styled = Styled.div`
  margin-bottom: 20px;
  h2 {
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: -.5px;
  }
`

const HeaderLvl2 = ({ title }) => {
  return (
    <HeaderLvl2Styled>
      <h2>{title}</h2>
    </HeaderLvl2Styled>
  )
}

export default HeaderLvl2
