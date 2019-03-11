import Styled from "styled-components" 
import CardBlog from "../cards/CardBlog"
import { color_blue_main } from "../Const"

const BlogBox = Styled.div`
  margin-top: 40px;
  .blog-box-title {
    border-bottom: 2px solid ${color_blue_main};
    padding-bottom: 10px;
    font-size: 20px
  }
`

export default props => {
  return (
    <BlogBox>
      <div className="grid-center">
        <h2 className="blog-box-title">
          {props.title || "Yang Baru di Blog"}
        </h2>
      </div>
      <div className="grid">
        <CardBlog />
        <CardBlog />
        <CardBlog />
        <CardBlog />
      </div>
    </BlogBox>
  )
}