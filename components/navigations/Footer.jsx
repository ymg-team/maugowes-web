import Styled from "styled-components"
import { color_gray_medium, color_gray_dark, color_black_main } from "../Const"

export const FooterStyled = Styled.div`
  padding: 80px 0;
  border-top: 1px solid ${color_gray_medium};
  border-bottom: 1px solid ${color_gray_medium};
  text-align: center;
  color: ${color_gray_dark};
  letter-spacing: .2px;
  line-height: 1.8;
  [class*=col-] {
    padding: 0;
  }
  .footer-left-logo {
    width: 100px;
    max-width: 100%;
    border-radius: 10px;
  }
  a {
    color: ${color_black_main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .footer-left {
    padding: 0 20px;
    .footer-social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      .footer-social-link_a {
        margin-right: 10px;
        img {
          width: 35px;
        }
      }
    }
  }
  .col.footer-content {
    padding: 0 50px;
    text-align: left;
    .footer-content-title {
      font-size: 20px;
      color: ${color_black_main};
      font-weight: 600;
      border-bottom: 1px solid ${color_black_main};
    }
    .footer-content-list {
      ul {
        list-style: none;
        padding-left: 0;
        li {
          margin-top: 10px;
        }
      }
    }
  }

  // gridlex _xs
  @media (max-width: 36em) {
    .footer-social-link {
      margin-bottom: 20px;
    }
  }
  // gridlex _sm
  @media (max-width: 48em) {

    .col.footer-content {
      padding: 0 10px;
    }

    .footer-social-link {
      margin-bottom: 20px;
    }
  }
`

const FooterPoweredBy = Styled.div`
  text-align: center;
  padding: 10px;
  color: ${color_gray_dark};
  letter-spacing: 1px;
  a {
    color: ${color_gray_dark};
    text-decoration: none;
  }

`

const Footer = () => {
  return (
    <>
      <FooterStyled className="grid">
        <div className="col-4_xs-12 footer-left">
          <img
            className="footer-left-logo"
            src="/static/images/logos/maugowes-v2/icon-128x128.png"
            alt="Logo Mau Gowes"
          />
          <div style={{ margin: "10px 0" }}>
            Mau Gowes - Adalah platform online yang dibuat untuk kamu para
            pecinta sepeda. Disini kamu bisa dapat konten menarik dan sekalian
            belanja pula.
          </div>
          <div className="footer-social-link text-black">
            <span style={{ marginRight: 20 }}>Social:</span>
            <span style={{ marginTop: 5 }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://www.youtube.com/channel/UCc0sgRlqAJCWejiiSIDJjdg">
                <img src="/static/images/youtube-48.png" alt="Youtube icon" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://instagram.com/maugowes">
                <img
                  src="/static/images/instagram-48.png"
                  alt="Instagram icon"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://facebook.com/maugowes">
                <img src="/static/images/facebook-48.png" alt="Facebook icon" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://twitter.com/maugowes">
                <img src="/static/images/twitter-48.png" alt="Twitter icon" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://wa.me/6285156934428?text=Ada%20pertanyaan%20seputar%20produk%20Yussan%20Media%20Group%2C%20bisa%20disini.">
                <img
                  style={{ width: 31, padding: 2 }}
                  src="/static/images/logos/whatsapp-48.png"
                  alt="Whatsapp icon"
                />
              </a>
            </span>
          </div>
        </div>
        <div className="col-8_xs-12 footer-right">
          <div className="grid">
            <div className="col footer-content">
              <div className="footer-content-title">Informasi</div>
              <div className="footer-content-list">
                <ul>
                  <li>
                    <a
                      target="_blank"
                      noreferer="true"
                      noopener="true"
                      href="https://maugowes.com/blog/Tentang-Kami-5cbc7e530ad6da31c52524dd">
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      noreferer="true"
                      noopener="true"
                      href="https://maugowes.com/blog/Syarat-dan-Ketentuan-5cbc7e620ad6da31c52524de">
                      Syarat dan Ketentuan
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      noreferer="true"
                      noopener="true"
                      href="https://maugowes.com/blog/Bantuan-5cbc7e6a0ad6da31c52524df">
                      Bantuan
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col footer-content">
              <div className="footer-content-title">Fitur</div>
              <div className="footer-content-list">
                <ul>
                  {/* <li>
                    <a href="/marketplace">Marketplace</a>
                  </li> */}
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                  <li>
                    <a href="/videos">Videos</a>
                  </li>
                  <li>
                    <a href="/events">Events</a>
                  </li>
                  <li>
                    <a href="/bikes">Bikes</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </FooterStyled>
      <FooterPoweredBy>
        Powered by{" "}
        <a href="https://byymg.com" target="_blank" rel="noopener noreferer">
          Yussan Media Group
        </a>
      </FooterPoweredBy>
    </>
  )
}

export default Footer
