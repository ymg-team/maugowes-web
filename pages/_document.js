import Document, { Head, Main, NextScript, Html } from "next/document"
import { ServerStyleSheet } from "styled-components"
import Toast from "../components/Toast"

export default class MyDocument extends Document {
  // ref: https://github.com/zeit/next.js/issues/816
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    )

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          <meta property="fb:pages" content="250248599190287" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/static/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <link rel="stylesheet" href="/static/style.css" />
          <link
            rel="stylesheet"
            href="/static/vendor/gridlex/gridlex.min.css"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/logos/maugowes-v2/icon-128x128.png"
          />
          <link
            rel="apple-touch-icon"
            href="/static/images/logos/maugowes-v2/icon-128x128.png"
          />
          <link rel="manifest" href="/manifest-v2.0.1.json" />
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            href="/opensearch.xml"
            title="Pencarian di Mau Gowes"
          />

          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          {/* The core Firebase JS SDK is always required and must be listed first */}
          {/* <script
            async
            defer
            src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script> */}

          {/* TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries */}
          {/* <script
            async
            defer
            src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js"></script> */}

          <Main />
          <NextScript />
          <Toast />

          {/* service worker initial */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", function () {
                  navigator.serviceWorker
                    .register("/service-worker.1.1.0.js")
                    .then(
                      function (registration) {
                        // Registration was successful
                        console.log(
                          "ServiceWorker registration successful with scope: ",
                          registration.scope
                        )
                      },
                      function (err) {
                        // registration failed :(
                        console.error("ServiceWorker registration failed: ", err)
                      }
                    )
                })
              }
            
            `,
            }}></script> */}
          {/* end of service worker initial */}
        </body>
      </Html>
    )
  }
}
