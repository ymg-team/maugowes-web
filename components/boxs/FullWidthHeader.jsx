import React from "react"
import Styled from "styled-components"
import { color_blue_main, color_black_main } from "../Const"

// components
import Breadcrumb from "../../components/navigations/Breadcrumb"

const FullWidthHeaderStyled = Styled.div`
  left: 0;
  width: 100%;
  background-color: #FFF;
  background-size: cover !important;
  background-position: center! important;
  padding: ${(props) =>
    props.breadcrumb && props.breadcrumb.length > 0 ? "17px 0 50px" : "50px 0"};
  text-align: center;
  letter-spacing: .6px;
  display: block;
  .container {
    max-width: 800px;
  }
  h1{
    margin: auto;  
    font-weight: 600;
    font-size: 45px;
    padding-bottom: 5px;
    color: ${color_blue_main};
    margin: 0;
    letter-spacing: .7px;
  }
  h2 {
    font-weight: 600;
    font-size: 45px;
    color: ${color_black_main};
    margin: 0;
  }
  #full-width-spacer {
    height: 375px;
  }
  // gridlex _xs
  @media (max-width: 36em) {
    h1, h2 {
      font-size: 25px;
    }
    padding: 10px 0;
  }
  // gridlex _sm
  @media (max-width: 48em) {
    h1, h2 {
      font-size: 30px;
    }
    padding: 10px 0;
  }
`

const FullWidthHeader = (props) => {
  const { stats, breadcrumb } = props
  return (
    <>
      {props.breadcrumb && props.breadcrumb.length > 0 ? (
        <Breadcrumb breadcrumb={breadcrumb} />
      ) : null}

      <FullWidthHeaderStyled {...props} id={props.id || "full-width-header"}>
        <div className="container">
          <h1>{props.title}</h1>
          <h2>{props.text}</h2>
          {stats ? (
            <p>
              Menampilkan {stats.show} dari {stats.total} {stats.suffix}
            </p>
          ) : null}
        </div>
      </FullWidthHeaderStyled>
    </>
  )
}

export default FullWidthHeader
