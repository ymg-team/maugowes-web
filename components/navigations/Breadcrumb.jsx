import Styled from "styled-components"
import Link from "next/link"
import { color_gray_dark } from "../Const"

const BreadcrumbStyled = Styled.div`
  display: flex;
  justify-content: ${(props) => props.position || "center"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  &.breadcrumb {
    .breadcrumb-child {
      color: ${color_gray_dark};
      &:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .breadcrumb-child__arrow {
      padding: 0 5px;
    }
  }
`

const Breadcrumb = ({ position, breadcrumb }) => {
  return (
    <BreadcrumbStyled position={position} className="breadcrumb">
      {breadcrumb.map((n, key) => (
        <div key={n.title} className="breadcrumb-child">
          <Link href={n.link}>
            <a>{n.title}</a>
          </Link>
          {key < breadcrumb.length - 1 ? (
            <span className="breadcrumb-child__arrow">/</span>
          ) : null}
        </div>
      ))}
    </BreadcrumbStyled>
  )
}

export default Breadcrumb
