import React, { useEffect, useState } from "react"
import Styled from "styled-components"
import DayJs from "dayjs"
import { nl2br } from "string-manager"
import { progressBar } from "../../modules/loaders"

// redux
import { connect } from "react-redux"
import { fetchEventDetail } from "../../redux/events/actions"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import DisqusBox from "../../components/boxs/Disqus"
import ShareBox from "../../components/boxs/Share"
import Loader from "../../components/Loader"
import GA from "../../components/boxs/GA"
import ShareIcon from "../../components/icons/Share"
import CommentIcon from "../../components/icons/Comment"
import EyeIcon from "../../components/icons/Eye"
import { BlogDetailStyled } from "../blog/[id]"
import InputLocation from "../../components/form/InputLocation"
import Label from "../../components/labels"
import { scaleNumber } from "string-manager/dist/modules/number"
import Breadcrumb from "../../components/navigations/Breadcrumb"
import { toSlug } from "string-manager/dist/modules/slug"

const EventDetailStyled = Styled(BlogDetailStyled)`
  strong.title {
    font-size: 25px;
  }
`

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

const EventDetail = (props) => {
  const [windowReady, setWindowReady] = useState(false)

  const id = getId(props.id)
  const data = props.event[id] || {}

  useEffect(() => {
    if (typeof window !== "undefined") {
      progressBar.start()
      setWindowReady(true)
      // this.fetchEventDetail()
      if (!data.status) {
        props.dispatch(fetchEventDetail(id))
      }
    }
  }, [])

  // listen change event id
  useEffect(() => {
    // const data = props.event[id] || {}
    if (!data.status) {
      props.dispatch(fetchEventDetail(id))
    }
  }, [id])

  // metadata generator
  let metadata = {}

  // breadcrumbs
  const BreadcrumbData = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/events",
      title: "Events",
    },
  ]

  if (data.status) progressBar.stop()

  if (data && data.status === 200) {
    BreadcrumbData.push({
      title: data.title,
      link: `/events/${toSlug(data.title)}-${data.id}`,
    })

    metadata = {
      title: data.title,
      // description: data.truncatedContent,
      image: data.poster.original,
      // keywords: data.tags.toString(),
      jsonld: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        alternativeHeadline: data.title,
        image: data.poster.original,
        genre: "cycling,bicycle,sepeda,gowes",
        keywords: "gowes bareng,info gobar,info gowes",
        wordcount: data.note ? data.note.length : 0,
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
        url: `https://maugowes.com${data.link}`,
        datePublished: new Date(data.created_on * 1000).toISOString(),
        dateCreated: new Date(data.created_on * 1000).toISOString(),
        dateModified: new Date(data.updated_on * 1000).toISOString(),
        // description: data.truncatedContent,
        author: {
          "@type": "Organization",
          name: "Mau Gowes",
        },
      },
    }
  } else {
    if (!data.status) {
      metadata = {
        title: "Event Loading...",
        description: "Tunggu sejenak.",
      }
    } else {
      metadata = {
        title: "Event tidak ditemukan",
        description:
          "Maaf event yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena event telah di hapus.",
      }
    }
  }

  return (
    <GlobalLayout metadata={metadata}>
      <DefaultLayout>
        <EventDetailStyled className="blog-detail">
          {!data.status ? (
            <Loader />
          ) : data.status === 200 ? (
            <>
              <div className="grid-center">
                <div className="col-7_xs-12">
                  <Breadcrumb position="left" breadcrumb={BreadcrumbData} />
                  <h1 style={{ marginBottom: -10 }}>
                    {data.title}{" "}
                    {data.is_ended ? (
                      <Label
                        style={{
                          fontSize: 20,
                          position: "absolute",
                          margin: "7.5px 0 0 10px",
                        }}
                        status={"ended_event"}
                        text={"Telah berakhir"}
                      />
                    ) : null}
                  </h1>
                  {/* post meta */}
                  <div className="blog-detail_meta">
                    <span className="blog-detail_meta_item">
                      <EyeIcon width="30" height="30" />
                      <span>{scaleNumber(data.views)}</span>
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

              <article className="blog-detail_content">
                <div className="grid-center">
                  <div className="col-7_xs-12" style={{ paddingBottom: 0 }}>
                    <div className="blog-detail_main-image">
                      <img src={data.poster.original} alt={data.title} />
                    </div>

                    <GA
                      style={{ margin: "30px 0" }}
                      adClient="ca-pub-4468477322781117"
                      adSlot="4316048838"
                    />

                    <p>
                      <strong className="title">Waktu : </strong>
                      <br />
                      {DayJs(data.start_time).format("DD MMMM YYYY HH:mm")}
                    </p>
                    <p>
                      <strong className="title">Catatan : </strong>
                      <br />
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            data.note && data.note.trim()
                              ? nl2br(data.note)
                              : "-",
                        }}
                      />
                      <br />
                      {data.event_link ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={data.event_link}>
                          Pelajari Selengkapnya
                        </a>
                      ) : null}
                    </p>
                  </div>
                </div>

                {/* maps */}

                {data.is_virtual ? (
                  <div className="grid-center">
                    <div className="col-7_xs-12">
                      <strong className="title">Titik Start : </strong>
                      <p>
                        Event sepeda ini merupakan{" "}
                        <strong>Virtual Event</strong> yang dikuti melalui
                        koneksi intenet.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid-center">
                    <div className="col-7_xs-12">
                      {data.location ? (
                        <>
                          <strong className="title">Titik Start : </strong>
                          <br />
                          {data.location.address ||
                            `latitude: ${data.location.coordinate.lat}, longitude: ${data.location.coordinate.lng}`}
                          <br />
                          <a
                            href={`https://maps.google.com/maps?q=${data.location.coordinate.lat},${data.location.coordinate.lng}`}
                            target="_blank"
                            rel="noopener noreferer">
                            Lihat Titik Start di Google Maps
                          </a>
                        </>
                      ) : null}
                    </div>
                    <div className="col-10_xs-12">
                      {data.geoJSON ? (
                        <InputLocation
                          readOnly
                          geoJSON={data.geoJSON}
                          coordinate={data.location.coordinate}
                          markers={[
                            {
                              name: "titik start",
                              coordinate: data.location.coordinate,
                            },
                          ]}
                          noLabel
                        />
                      ) : data.location && data.location.coordinate ? (
                        <InputLocation
                          readOnly
                          coordinate={data.location.coordinate}
                          noLabel
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </article>
              {/* end of maps */}

              <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />

              {/* share box */}
              <div className="grid-center" id="share-box">
                <div className="col-7_xs-12">
                  <ShareBox url={`https://maugowes.com${data.link}`} />
                </div>
              </div>
              {/* end of share box */}

              {/* comment */}
              <div className="grid-center" id="comment-box">
                <div className="col-7_xs-12 blog-detail_comment">
                  {windowReady ? (
                    <DisqusBox
                      url={`${window.location.origin}/events/${id}`}
                      identifier={`maugowes-${id}`}
                    />
                  ) : null}
                </div>
              </div>
              {/* end of comment */}
            </>
          ) : (
            <Loader text={data.messages} />
          )}
        </EventDetailStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

EventDetail.getInitialProps = async ({ req, reduxStore, query }) => {
  if (req) {
    const id = getId(query.id)
    await reduxStore.dispatch(fetchEventDetail(id))
  }

  return { id: query.id }
}

const mapStateToProps = (state) => {
  return {
    event: state.Events,
  }
}

export default connect(mapStateToProps)(EventDetail)
