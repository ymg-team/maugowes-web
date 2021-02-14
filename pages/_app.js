import App from "next/app"
import React from "react"
import withReduxStore from "../modules/withRedux"
import { Provider } from "react-redux"
import Head from "next/head"

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        {/* ref: https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md */}
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
        </Head>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
