import Styled from 'styled-components'
import {
  color_blue_main,
  color_gray_dark,
  color_white_main,
  color_red_main
} from '../Const'
const LabelStyle = Styled.span`
	padding: 4px 10px;
	border-radius: 5px;
	color: ${color_white_main};
	${({ status }) => {
    let bg = color_blue_main
    switch (status) {
      case 'reject':
      case 'ended_event':
        bg = color_red_main
        break
      case 'waiting':
        bg = color_gray_dark
        break
      default:
        break
    }
    return `
			background-color: ${bg};
		`
  }}
`
const Label = props => {
  return (
    <LabelStyle style={props.style} status={props.status}>
      {props.text ? props.text : props.status}
    </LabelStyle>
  )
}

Label.defaultProps = {
  style: {}
}

export default Label
