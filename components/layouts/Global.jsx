import Head from "next/head"
import Styled from "styled-components"

// components
import {
  color_black_main,
  color_blue_main,
  color_gray_dark,
  color_red_main,
} from "../Const"

const GlobalLayoutStyled = Styled.div`
  color: ${color_black_main};

  a {
    text-decoration: none;
    color: ${color_blue_main};
  }

  .text-muted {
    color: ${color_gray_dark} !important;
  }

  // form components global style
  select {
    background: #FFF;
    border: none;
    outline: none
  }
  
  // global class
  .container {
    width: 1150px;
    margin: 0 auto;
  }

  // responsive container
  .align-center {
    text-align: center;
  }
  [class~=col] {
    padding: 0;
    margin: 0;
  }
  .m-t-b-30 {
    margin: 30px 0 !important;
  }
  .m-t-50 {
    margin-top: 50px !important;
  }
  .m-t-30 {
    margin-top: 30px !important;
  }
  .p-t-b-30 {
    padding: 30px 0;
  }
  .p-t-30 {
    padding-top: 30px;
  }
  .p-b-50 {
    padding-bottom: 50px;
  }
  .text-black {
    color: ${color_black_main};
  }
  .text-ted {
    color: ${color_red_main};
  }

  // responsive section
  // gridlex _xs
  @media (max-width: 36em) {
    .container {
      width: 100%;
    }
  }
  // gridlex _sm
  @media (max-width: 48em) {
    .container {
      width: 100%;
    }
  }
`

const defaultMetadata = {
  title: "Mau Gowes - Maaaauuu...",
  description: "Mau gowes yuk main disini dulu agar lebih termotivasi",
  image:
    "https://res.cloudinary.com/dhjkktmal/image/upload/v1555855650/maugowes/2019/mau_gowes.png",
  keywords:
    "mau gowes,bersepeda,cycling,bicycle,sepeda,roadbike,mtb,folding bike,bike to work",
  url: "https://maugowes.com",
  type: "blog",
}

const HomeLayout = (props) => {
  const { children, metadata = defaultMetadata, scripts = [] } = props
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {/* open graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:type" content={metadata.type} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:description" content={metadata.description} />
        {/* twitter card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@maugowes" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        {typeof metadata.jsonld == "object" ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(metadata.jsonld),
            }}
          />
        ) : null}
        {scripts.length > 0
          ? scripts.map((n, key) => {
              return <script src={n.src} key={key} id={n.id || ""} />
            })
          : null}
        {process.env.NODE_ENV === "production" ? (
          <>
            <script
              async
              defer
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
            <script
              async
              defer
              src="https://www.googletagmanager.com/gtag/js?id=UA-138742898-1"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-138742898-1');
            `,
              }}
            />
          </>
        ) : null}
      </Head>

      <GlobalLayoutStyled>{children}</GlobalLayoutStyled>
    </>
  )
}

export default HomeLayout
