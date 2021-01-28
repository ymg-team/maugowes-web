import Styled from "styled-components"
import { color_gray_dark } from "./Const"

const LoaderStyled = Styled.div`
  padding: 50px 20px;
  color: ${color_gray_dark};
  .loader{
    width: ${(props) =>
      props.size == "large"
        ? "100px"
        : props.size == "small"
        ? "30px"
        : "50px"};
    height: ${(props) =>
      props.size == "large"
        ? "100px"
        : props.size == "small"
        ? "30px"
        : "50px"};
    border-radius: 100%;
    position: relative;
    margin: 0 auto;
  }
  #loader-1:before, #loader-1:after{
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 10px solid transparent;
    border-top-color: #3498db;
  }
  
  #loader-1:before{
    z-index: 100;
    animation: spin 1s infinite;
  }
  
  #loader-1:after{
    border: 10px solid #ccc;
  }
  
  @keyframes spin{
    0%{
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  
    100%{
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

const Loader = (props) => {
  return (
    <LoaderStyled size={props.size} className="grid-center">
      {props.text ? (
        <div>{props.text}</div>
      ) : (
        <div className="three col">
          <div className="loader" id="loader-1" />
        </div>
      )}
    </LoaderStyled>
  )
}

export default Loader
