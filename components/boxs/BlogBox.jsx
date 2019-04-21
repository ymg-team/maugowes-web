import Styled from "styled-components"
import CardBlog from "../cards/CardBlog"
import { color_blue_main } from "../Const"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"

const BlogBoxStyled = Styled.div`
  margin-top: ${props => (props.noHeaderTitle ? "80px" : "40px")};
  .blog-box-title {
    border-bottom: 2px solid ${color_blue_main};
    padding-bottom: 10px;
    font-size: 20px
  }
`

const BlogBox = props => {
  const { results, status, message, stats, is_loading } = props.data

  return (
    <BlogBoxStyled noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="blog-box-title">
            {props.title || "Yang Baru di Blog"}
          </h2>
        </div>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              let size = "default"
              if (key === 0 || key % 5 === 0) size = "large"
              return <CardBlog size={size} key={key} data={n} />
            })}
          </div>
        ) : null
      ) : null}

      {is_loading ? <Loader /> : null}

      {status && status !== 200 ? <Error text={message} /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length >= props.maxResults ? (
        <div className="grid-center" style={{ margin: "20px 0 40px" }}>
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Postingan Berikutnya" : "Loading..."}
            size="large"
            onClick={() => {
              props.loadmoreHandler()
            }}
          />
        </div>
      ) : null}
    </BlogBoxStyled>
  )
}

BlogBox.defaultProps = {
  maxResults: 3
}

export default BlogBox
