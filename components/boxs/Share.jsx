import Styled from "styled-components"

const ShareBoxStyled = Styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    .box-share-title {
        margin-right: 20px;
    }
    .box-share-link {
        margin-right: 5px;
    }
`

const Share = ({ url }) => (
  <ShareBoxStyled className="share-box">
    <strong className="box-share-title">Bagikan ke: </strong>
    <br />
    {/* facebook share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "Share Mau Gowes ke Facebook",
          "width=600,height=400"
        )
      }}>
      <img src="/static/images/facebook-48.png" alt="share ke Facebook" />
    </a>
    {/* end of facebook share */}

    {/* twitter share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://twitter.com/intent/tweet?text=${url}`,
          "Share Mau Gowes ke Twitter",
          "width=600,height=400"
        )
      }}>
      <img src="/static/images/twitter-48.png" alt="share ke Twitter" />
    </a>
    {/* end if twiter share */}

    {/* linkedin share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
          "Share Mau Gowes ke Linkedin",
          "width=600,height=400"
        )
      }}>
      <img
        style={{ width: 48 }}
        src="/static/images/linkedin-48.png"
        alt="share ke Linkedin"
      />
    </a>
    {/* end of linkedin share */}
  </ShareBoxStyled>
)

export default Share
