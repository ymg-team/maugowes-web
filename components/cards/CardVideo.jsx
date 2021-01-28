import Styled from "styled-components"
import { color_black_main, color_gray_dark } from "../Const"
import Dayjs from "../../modules/dayjs"
import Link from "next/link"

const VideoCard = Styled.div`
  border: 1px solid #FFF;
  margin-bottom: 80px;

 .video-card-meta {
  padding: 15px 0;
  .video-card-title {
    overflow: hidden;
    a {
      text-decoration: none;
      color: ${color_black_main};
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
    }
   } 
  
   .video-card-date {
     color: ${color_gray_dark}
   }
 }

 .video-card-cover {
  position: relative;
  height: 200px;
  background-color: #000;
  background-size: 100%;
  background-position: center;
  transition: background .5s ease;
  background-repeat: no-repeat;
  border-radius: 10px;
  &:hover {
    background-size: 400px;
  }
  .btn-play-video {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
    cursor: pointer
  }
  .btn-play-video img {
    width: 50px;
  }
 }

//responsiveness
// gridlex _xs
@media (max-width: 36em) {
  
}
// gridlex _sm
@media (max-width: 48em) {

  margin-bottom: 40px;

  &.video-large {
    .video-card-cover {
      width: 100%;
      height: 200px;
    }
    .video-card-meta {
      width: calc(100% - 40px);
      .video-card-title {
        height: 100px;
        h2 {
          font-size: 18px;
        }
      }
    }
  }
}
`

const CardVideo = (props) => {
  const { data = {}, size } = props || {}
  return (
    <div
      className={
        size === "large"
          ? "col-8_md-12_xs-6"
          : size === "supersmall"
          ? "col-3_md-4_xs-6"
          : "col-4_md-6_xs-6"
      }>
      <VideoCard className={size === "large" ? "video-large" : "video-default"}>
        <div
          className="video-card-cover"
          style={{ backgroundImage: `url(${data.thumbnails.high.url})` }}>
          <Link href="/videos/[id]" as={data.link}>
            <a className="btn-play-video" title="play video">
              <img
                src={"/static/images/icons/white-play-button.png"}
                alt="play video"
              />
            </a>
          </Link>
        </div>

        <div className="video-card-meta">
          <div className="video-card-title">
            <Link href="/videos/[id]" as={data.link}>
              <a>
                <h2>{data.title}</h2>
              </a>
            </Link>
          </div>
          <div className="video-card-date">
            Diposting {Dayjs(data.publishedDate).fromNow()}
          </div>
        </div>
      </VideoCard>
    </div>
  )
}

export default CardVideo
