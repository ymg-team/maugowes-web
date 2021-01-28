import React from "react"
import Styled from "styled-components"
import Button from "../buttons/index"

import toast from "../../modules/toast"

const CardHomeSlidderStyled = Styled.div`
  width: 100%;
  height: 450px;

  .slider-item-right {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: calc(100% - 40px);
    height: 100%;
    h2 {
      font-size: 2.5em;
      line-height: 1.1;
      font-weight: 700;
    }
  }

  .slider-item-left {
    background-size: cover;
    position: relative;
    .text {
      position: absolute;
      left: 10px;
      bottom: 10px;
      color: #FFF;
      font-size: 10px;
    }
  }

  // gridlex _xs
  @media (max-width: 36em) {
    height: 350px;
    .slider-item-right {
      padding: 0 10px;
      width: calc(100% - 20px);
      h2 {
        font-size: 1.5em
      }
    }
  }
  // gridlex _sm
  @media (max-width: 48em) {
    height: 350px;
    .slider-item-right {
      padding: 0 10px;
      width: calc(100% - 20px);
      h2 {
        font-size: 1.5em
      }
    }
  }
`

const SliderContent = [
  {
    title: "Cek Video Terbaru di Youtube Mau Gowes",
    cover_image: "/static/images/cover/cover-videos.jpeg",
    link_target: "/videos",
    link_text: "Video Baru",
  },
  {
    title: "Membandingkan Spek Berbagai Sepeda",
    cover_image: "/static/images/cover/cover-bikes.jpeg",
    link_target: "/bikes",
    link_text: "Berikutnya",
  },
  {
    title: "Punya Event Gowes / Ingin Gowes Bareng ?",
    cover_image: "/static/images/cover/cover-events.jpeg",
    link_target: "/events",
    link_text: "Cek Disini",
  },
  {
    title: "Postingan Terbaru di Blog Mau Gowes",
    cover_image: "/static/images/cover/cover-blog.jpeg",
    link_target: "/blog",
    link_text: "Berikutnya",
  },
]

const SliderContentComponent = () => {
  return SliderContent.map((n, key) => (
    <CardHomeSlidderStyled className="grid" key={key}>
      <div
        className="col-7_xs-6 slider-item-left"
        style={{ backgroundImage: `url(${n.cover_image})` }}>
        <span className="text">Sumber: unsplash.com</span>
      </div>
      <div className="col-5_xs-6">
        <div className="slider-item-right">
          <div>
            <h2>{n.title}</h2>
            <Button
              onClick={() => (location.href = n.link_target)}
              size="medium"
              text={n.link_text}
            />
          </div>
        </div>
      </div>
    </CardHomeSlidderStyled>
  ))
}

export default SliderContentComponent
