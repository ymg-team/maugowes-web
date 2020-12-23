import { useEffect, useState } from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { nl2br, toSlug } from "string-manager"
import { progressBar } from "../../modules/loaders"
import Dayjs from "../../modules/dayjs"

// redux
import { fetchVideoDetail, fetchVideos } from "../../redux/videos/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import { color_gray_dark } from "../../components/Const"
import VideoSSBox from "../../components/boxs/VideoSuperSmallBox"
import DisqusBox from "../../components/boxs/Disqus"
import ShareBox from "../../components/boxs/Share"
import Loader from "../../components/Loader"
import GA from "../../components/boxs/GA"
import Breadcrumb from "../../components/navigations/Breadcrumb"

const VideoDetailStyled = Styled.div`
  .video-title {
    padding: 5px 5px;
    margin: 0 -8px 20px;
    h1 {
      font-weight: 600;
      line-height: 1.3;
      font-size: 38px;
      margin-top: 17px
    }
  }

  .video-meta {
    color: ${color_gray_dark};
  }

  .video-player {
    display: flex;
    justify-content: center;
    margin: 0 -8px;
    background: #000;
    
    iframe {
      width: 100%;
      height: 500px;
    }

    // responsive section
    // gridlex _xs
    @media (max-width: 36em) {
      padding: 0;
      iframe {
        width: 100%;
        height: 300px;
      }
    }
    // gridlex _sm
    @media (max-width: 48em) {
      padding: 0;
      iframe {
        width: 100%;
        height: 300px;
      }
    }
  }
`

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

const VideoDetail = (props) => {
  const [windowReady, setWindowReady] = useState(false)

  const id = getId(props.id)
  const data = props.videos[id] || {}
  const relatedData = props.videos.related || {}

  useEffect(() => {
    // same as componentDidMount
    if (typeof window !== "undefined" && !windowReady) {
      setWindowReady(true)
      // fetch video detail from api
      if (!data.status) {
        props.dispatch(fetchVideoDetail(id))
      }
      // fetch video related
      const videoRelatedState = props.videos.related || {}

      if (!videoRelatedState.status) {
        progressBar.start()
        props.dispatch(
          fetchVideos("related", {
            limit: 4,
            page: 1,
            notId: getId(props.id),
          })
        )
      }
    }
  }, [])

  // handle on change id / change video detail
  useEffect(() => {
    if (!data.status) {
      props.dispatch(fetchVideoDetail(id))
    }
  }, [id])

  const BreadcrumbData = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/videos",
      title: "Videos",
    },
  ]

  if (data.status) {
    BreadcrumbData.push({
      title: data.title,
      link: `/videos/${toSlug(data.title)}-${data._id}`,
    })
    progressBar.stop()
  }

  let metadata = {}

  if (data && data.status == 200) {
    metadata = {
      title: data.title,
      description: data.description,
      image: data.thumbnails.high,
      keywords: "video,maugowes,youtube",
      jsonld: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        alternativeHeadline: data.title,
        image: data.thumbnails.high,
        genre: "cycling,bicycle,sepeda,gowes",
        keywords: "video,maugowes,youtube",
        wordcount: data.description.length,
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
        url: `https://maugowes.com/videos/${props.id}`,
        datePublished: new Date(data.publishedDate).toISOString(),
        dateCreated: new Date(data.publishedDate).toISOString(),
        dateModified: new Date(data.publishedDate).toISOString(),
        description: data.description,
        author: {
          "@type": "Organization",
          name: "Mau Gowes",
        },
      },
    }
  } else {
    if (!data.status) {
      metadata = {
        title: "Video loading...",
        description: "Tunggu sejenak, memproses video...",
      }
    } else {
      metadata = {
        title: "Video tidak ditemukan",
        description:
          "Maaf video yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena video telah di hapus.",
      }
    }
  }

  // function to fetch video detail
  // const fetchVideoDetail = () => {
  //   const id = getId(props.id)
  //   const videoDetail = props.videos.id || {}

  //   if (!videoDetail.status) {
  //     props.dispatch(fetchVideoDetail(id))
  //   }
  // }

  return (
    <GlobalLayout metadata={metadata}>
      <DefaultLayout>
        <VideoDetailStyled>
          {data.satus ? (
            <Loader />
          ) : data.status === 200 ? (
            <>
              {/* video detail */}
              <div className="grid-center">
                <div className="col-7_xs-12">
                  <Breadcrumb position="left" breadcrumb={BreadcrumbData} />
                  <div className="video-title">
                    <h1>{data.title}</h1>
                    <div className="video-meta">
                      Diposting {Dayjs(data.publishedDate).fromNow()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-player">
                <iframe
                  title={`embed video ${data.title}`}
                  src={`https://youtube.com/embed/${data.id}?autoplay=1`}
                  frameBorder={0}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <GA
                style={{ margin: "30px 0" }}
                adClient="ca-pub-4468477322781117"
                adSlot="2754181340"
              />

              <div className="grid-center">
                <div className="col-7_xs-12">
                  <p
                    style={{
                      lineHeight: 1.8,
                      wordBreak: "break-all",
                      padding: "25px 0 0",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: nl2br(data.description),
                    }}
                  />

                  <div className="grid" id="share-box">
                    <div className="col-12">
                      <ShareBox
                        url={`https://maugowes.com/videos/${props.id}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* end of video detail */}

              <VideoSSBox title="Video Lainnya" data={relatedData} />

              <GA
                style={{ marginBottom: 0 }}
                adClient="cca-pub-4468477322781117"
                adSlot="2754181340"
              />

              <div className="m-t-50" />

              <div className="grid-center" id="comment-box">
                <div className="col-7_xs-12 blog-detail_comment">
                  {windowReady ? (
                    <DisqusBox
                      url={`${window.location.origin}/videos/${props.id}`}
                      identifier={`maugowes-video-${id}`}
                    />
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <Loader text={data.messages} />
          )}
          {/* end of comment */}
        </VideoDetailStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

VideoDetail.getInitialProps = async ({ req, reduxStore, query }) => {
  if (req) {
    const id = getId(query.id)
    await reduxStore.dispatch(fetchVideoDetail(id))
  }

  return { id: query.id }
}

const mapsStateToProps = (state) => {
  return {
    videos: state.Videos,
  }
}

export default connect(mapsStateToProps)(VideoDetail)
