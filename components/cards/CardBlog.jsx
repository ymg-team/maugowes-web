import React from "react"
import Dayjs from "../../modules/dayjs"
import Styled from "styled-components"
import { color_gray_dark, color_black_main, color_blue_main } from "../Const"
import Link from "next/link"

const CardBlogStyled = Styled.div`

  margin-bottom: 80px;

  .card-blog-cover {
    position: relative;
    padding: 10px 20px;
    height: 250px;
    background-size: cover;
    background-position: top center;
    cursor: pointer;
    border-radius: 10px;
  }

  .card-blog-tags {
    text-align: left;
    overflow-y: hidden;
    height: 50px;
    font-size: 14px;
    .card-blog-label {
      padding: 15px 0;
      margin-right: 15px;
      transition: background .5s ease;
      background-color: #FFF;
      color: ${color_blue_main};
      font-weight: bold;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
    }
  }

  .card-blog-title {
    overflow: hidden;
    h3 {
      bottom: 0;
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      a {
        color: ${color_black_main};
        text-decoration: none;
      }
    }
  }

  .card-blog-content {
    margin-top: 10px;
    text-align: left;
    line-height: 1.5;
    color: ${color_gray_dark};
  }

  .card-blog-date {
    color: ${color_gray_dark};
    text-align: left;
  }

  // responsiveness
  @media (max-width: 48em) { 
    margin-bottom: 40px;
    .card-blog-title {
      h3 {
        font-size: 18px;
      }
    }
  }
`

const CardBlog = (props) => {
  const { data = {}, size } = props || {}
  const linkUrl = data.link
  return (
    <CardBlogStyled
      className={size === "small" ? "col-3_xs-_md-6" : "col-4_xs-_md-6"}>
      <Link href="/blog/[id]" as={linkUrl}>
        <a>
          <div
            className="card-blog-cover"
            style={{
              backgroundImage: `url(${
                data.image ? data.image["600"] : "/static/images/no-image.png"
              })`,
            }}
          />
        </a>
      </Link>

      {/* tag of post */}
      <div className="card-blog-tags">
        {data.tags && data.tags.length > 0
          ? data.tags.map((tag, key) => (
              <Link key={key} href="/blog/tag/[tag]" as={`/blog/tag/${tag}`}>
                <a className="card-blog-label">{tag}</a>
              </Link>
            ))
          : null}
      </div>

      {/* title if post */}
      <div className="card-blog-title">
        <h3>
          <Link href="/blog/[id]" as={linkUrl}>
            <a>{data.title || "..."}</a>
          </Link>
        </h3>
      </div>
      <br />
      <div className="card-blog-date">
        Diposting {Dayjs(data.created_on * 1000).fromNow()}
      </div>
    </CardBlogStyled>
  )
}

export default CardBlog
