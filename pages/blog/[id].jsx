import Styled from "styled-components"
import { toCamelCase, toSlug } from "string-manager"
import { useEffect } from "react"

// redux
import { connect } from "react-redux"
import {
  fetchBlogDetail,
  fetchBlog,
  fetchMoreBlog,
} from "../../redux/blog/actions"

// modules
import Dayjs from "../../modules/dayjs"
import { progressBar } from "../../modules/loaders"
import { scaleNumber } from "string-manager"

// components
import {
  color_gray_dark,
  color_gray_soft,
  color_blue_main,
  color_white_main,
} from "../../components/Const"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import DisqusBox from "../../components/boxs/Disqus"
import ShareBox from "../../components/boxs/Share"
import Loader from "../../components/Loader"
import GA from "../../components/boxs/GA"
import BlogBox from "../../components/boxs/BlogBox"
import ShareIcon from "../../components/icons/Share"
import CommentIcon from "../../components/icons/Comment"
import EyeIcon from "../../components/icons/Eye"
import Breadcrumb from "../../components/navigations/Breadcrumb"

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

export const BlogDetailStyled = Styled.div`
  position: relative;
  h1 {
    font-weight: 600;
    font-size: 38px;
  }
  h2 {
    margin-top: 50px;
  }
  h3 {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 0;
  }
  h4 {
    font-size: 15px;
    margin-top: 40px;
    margin-bottom: 0;
  }
  .blog-detail_author {
    margin-top: 50px
  }
  img.blog-detail_author_avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left !important;
  }
  .blog-detail_video {
    width: 100%;
    margin: 50px 0 30px;
    padding: 50px 0;
    background: #000;
    iframe {
      width: 100%;
      height: 400px;
      border: none;
    }
  }
  .link-blog-detail_author {
    text-decoration: none;
    color: ${color_gray_dark};
  }
  .blog-detail_author_name {
    padding-top: 6px;
    padding-left: 60px;
  }
  .blog-detail_author_level {
    padding-left: 60px;
    color: ${color_gray_dark};
  }
  .blog-detail_main-image {
    margin-top: 50px;
    margin-bottom: 10px;
    text-align: center;
    img {
      max-width: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }
  .blog-detail_content {
    line-height: 2.5;
    img {
      margin: 20px auto;
      max-width: 100%;
      display: block;
      border-radius: 10px;
    }
    a{
      word-break: break-all;
    }
    h2 {
      background: ${color_blue_main};
      color: ${color_white_main};
      padding: 0 10px;
      line-height: 2;
    }
  }
  .blog-detail_tag {
    display: block;
    margin: 20px 0;
    a {
      &:hover {
        background: #FFF;
        border: 1px solid ${color_gray_soft};
      }
      line-height: 2.5;
      cursor: pointer;
      padding: 5px 10px;
      background: ${color_gray_soft};
      color: ${color_gray_dark};
      text-decoration: none;
      margin-right: 10px;
    }
  }
  .blog-detail_meta {
    margin-top: 20px;
    color: ${color_gray_dark};
    svg {
      vertical-align: middle;
      margin-right: 5px;
    }
    .blog-detail_meta_item {
      margin-right: 16px;
      a {
        color: ${color_gray_dark};
        text-decoration: none;
      }
    }
  }
`

const BlogDetail = ({ id, dispatch, blog }) => {
  const RelatedFilter = `related_${id}`

  const BreadcrumbData = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/blog",
      title: "Blog",
    },
  ]

  // fetch blog data
  const blogData = blog[id] || {}
  if (!blogData.status && !blogData.is_loading) {
    dispatch(fetchBlogDetail(id))
  }

  const blogRelated = blog[RelatedFilter] || {}

  //every change id
  useEffect(() => {
    if (blogData.status === 200 && process.browser) {
      dispatch(
        fetchBlog(RelatedFilter, {
          limit: 4,
          page: 1,
          tag: blogData.tags,
          notId: id,
        })
      )
    }
  }, [id])

  let metadata = {}

  if (blogData && blogData.status === 200) {
    progressBar.stop()

    BreadcrumbData.push({
      link: `/blog/${toSlug(blogData.title)}-${blogData.id}`,
      title: blogData.title,
    })

    metadata = {
      title: blogData.title,
      description: blogData.truncatedContent,
      image: blogData.image.original,
      keywords: blogData.tags.toString(),
      jsonld: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogData.title,
        alternativeHeadline: blogData.title,
        image: blogData.image.original,
        genre: "cycling,bicycle,sepeda,gowes",
        keywords: blogData.tags.toString(),
        wordcount: blogData.content.length,
        publisher: {
          "@type": "Organization",
          name: "Mau Gowes",
          logo: {
            "@type": "ImageObject",
            url: "https://maugowes.com/static/icons/icon-512x512.png",
            height: "500",
            width: "500",
          },
        },
        url: `https://maugowes.com${blogData.link}`,
        datePublished: new Date(blogData.created_on * 1000).toISOString(),
        dateCreated: new Date(blogData.created_on * 1000).toISOString(),
        dateModified: new Date(blogData.updated_on * 1000).toISOString(),
        description: blogData.truncatedContent,
        author: {
          "@type": "Person",
          name: blogData.author.username,
        },
      },
    }
  } else {
    if (!blogData.status) {
      progressBar.start()
      metadata = {
        title: "Blog loading...",
        description: "Tunggu sejenak.",
      }
    } else {
      progressBar.stop()
      metadata = {
        title: "Postingan tidak ditemukan",
        description:
          "Maaf postingan yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena postingan telah di hapus.",
      }
    }
  }

  // render the component
  return (
    <GlobalLayout metadata={metadata}>
      <DefaultLayout>
        <BlogDetailStyled className="blog-detail">
          {!blogData.status ? (
            <Loader />
          ) : blogData.status === 200 ? (
            <>
              <div className="grid-center">
                <div className="col-7_xs-12">
                  <Breadcrumb position="left" breadcrumb={BreadcrumbData} />

                  <h1>{blogData.title}</h1>

                  {/* list tag of post */}
                  {blogData.tags && blogData.tags.length > 0 ? (
                    <div className="blog-detail_tag">
                      {blogData.tags.map((n, key) => {
                        return (
                          <a key={key} href={`/blog/tag/${n}`}>
                            {n}
                          </a>
                        )
                      })}
                    </div>
                  ) : null}
                  {/* end of list tag of post */}

                  {/* author */}
                  <a className="link-blog-detail_author" href="/author/yussan">
                    <div className="blog-detail_author">
                      <img
                        className="blog-detail_author_avatar"
                        src={blogData.author.avatar}
                        alt={`${blogData.author.username} avatar`}
                      />
                      <div className="blog-detail_author_name">
                        Oleh {toCamelCase(blogData.author.fullname)}
                      </div>
                      <div className="blog-detail_author_level">
                        Diposting {Dayjs(blogData.created_on * 1000).fromNow()}
                      </div>
                    </div>
                  </a>
                  {/* end of author */}

                  {/* post meta */}
                  <div className="blog-detail_meta">
                    <span className="blog-detail_meta_item">
                      <EyeIcon width="30" height="30" />
                      <span>{scaleNumber(blogData.views)}</span>
                    </span>

                    <span className="blog-detail_meta_item">
                      <a
                        onClick={() => {
                          document
                            .getElementById("comment-box")
                            .scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            })
                        }}
                        href="javascript:;">
                        <CommentIcon width="30" height="30" />
                        <span>0</span>
                      </a>
                    </span>

                    <span className="blog-detail_meta_item">
                      <a
                        onClick={() => {
                          document.getElementById("share-box").scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          })
                        }}
                        href="javascript:;">
                        <ShareIcon width="25" height="25" />
                        <span>Share</span>
                      </a>
                    </span>
                  </div>
                  {/* end of post meta */}
                </div>
              </div>
              <div className="grid-center">
                {blogData.video ? (
                  <div className="blog-detail_video">
                    <iframe src={`${blogData.video}?autoplay=1`} />
                  </div>
                ) : (
                  <div className="blog-detail_main-image">
                    <img src={blogData.image.original} alt={blogData.title} />
                  </div>
                )}

                <div className="col-7_xs-12">
                  <GA
                    style={{ margin: "30px 0" }}
                    adClient="ca-pub-4468477322781117"
                    adSlot="4316048838"
                  />

                  <article
                    className="blog-detail_content"
                    dangerouslySetInnerHTML={{ __html: blogData.content }}
                  />
                </div>
              </div>

              <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />

              {/* share box */}
              <div className="grid-center" id="share-box">
                <div className="col-7_xs-12">
                  <ShareBox url={`https://maugowes.com${blogData.link}`} />
                </div>
              </div>
              {/* end of share box */}

              {/* blog box */}
              <div className="blog-detail_related">
                <BlogBox
                  size="small"
                  hideAds
                  style={{ margin: "20px 0" }}
                  noHeaderTitle
                  noStats
                  data={blogRelated}
                />
              </div>
              {/* end of blog box */}

              {/* comment */}
              <div className="grid-center" id="comment-box">
                <div className="col-7_xs-12 blog-detail_comment">
                  {typeof window !== "undefined" ? (
                    <DisqusBox
                      url={`${window.location.origin}/blog/${id}`}
                      identifier={`maugowes-${id}`}
                    />
                  ) : null}
                </div>
              </div>
              {/* end of comment */}
            </>
          ) : (
            <Loader text={blogData.messages} />
          )}
        </BlogDetailStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

BlogDetail.getInitialProps = async ({ req, reduxStore, query }) => {
  const id = getId(query.id)
  if (req) {
    await reduxStore.dispatch(fetchBlogDetail(id))
  }

  return { id }
}

const mapStateToProps = (state) => {
  return {
    blog: state.Blog,
  }
}

export default connect(mapStateToProps)(BlogDetail)
