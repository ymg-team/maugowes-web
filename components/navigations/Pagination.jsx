import Styled from "styled-components"
import Link from "next/link"
import { color_black_main } from "../Const"

const Pagination = Styled.div`
  padding: 10px 0 20px;
  .col{
    text-align: center;
    ul {
      display: -webkit-inline-box;
      li {
        cursor: pointer;
        width: 10px;
        height: 15px;
        list-style: none;
        font-size: 12px;
        font-weight: 600;
        &.active {
          background-color: #fff;
          border: 1px solid ${color_black_main};
        }
        border: 1px solid transparent;
        background-color: #FFF;
        color: ${color_black_main};
        padding: 10px 15px;
        margin-right: 10px;
      }
    }
  }
`

export default props => {
  return (
    <Pagination className="grid-center">
      <div className="col">
        <ul>
          <li className="active">
            <span>1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
        </ul>
      </div>
    </Pagination>
  )
}
