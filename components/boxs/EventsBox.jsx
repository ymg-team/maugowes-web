import React from "react"
import Router from "next/router"
import Styled from "styled-components"
import Card from "../cards/CardEvent"
import { color_gray_medium, color_gray_dark, color_gray_soft } from "../Const"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"
import GA from "./GA"
import Link from "next/link"

const EventsBoxStyled = Styled.div`
  margin-top: ${(props) => (props.noHeaderTitle ? "80px" : "40px")};
  .events-box-title {
    padding-bottom: 10px;
    font-size: 30px;
    font-weight: 600;
  }
  .events-box-meta {
    a {
      color: ${color_gray_dark};
      text-decoration: none;
    }
  }
  .filter {
    padding: 0 20px;
    margin-bottom: 50px;
    form {
      padding: 10px 0;
      border-top: 1px solid ${color_gray_medium};
      border-bottom: 1px solid ${color_gray_medium};
      font-size: 15px;
    }
  }
`

const EventsBox = (props) => {
  let { query = {} } = props
  const { results, status, message, total, is_loading } = props.data

  return (
    <EventsBoxStyled>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="video-box-title">
            {props.title || "Yang Baru di Events"}
          </h2>
        </div>
      ) : (
        <center style={{ marginBottom: 20, lineHeight: 1.5 }}>
          Atau kamu juga bisa{" "}
          <Link href="/events/send">
            <a
              href="/events/send"
              title="Kamu punya event sepeda, yuk kirim ke Mau Gowes">
              + Kirim Event Baru
            </a>
          </Link>
        </center>
      )}

      {props.useFilter ? (
        <div className="grid">
          <div className="col filter">
            <form action="" method="get">
              <label htmlFor="filter-show-active">
                <input
                  id="filter-show-active"
                  type="checkbox"
                  checked={query.show_all || 0}
                  onChange={() => {
                    query.show_all = query.show_all ? 0 : 1
                    props.setState(query)
                    // ref : https://github.com/zeit/next.js/#userouter
                    return Router.push({
                      pathname: "/events",
                      query,
                    })
                  }}
                />
                &nbsp; Tampilkan semua{" "}
              </label>
            </form>
          </div>
        </div>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              const keyPlus1 = key + 1
              return (
                <React.Fragment key={key}>
                  <Card data={n} />
                  {results.length > 12 && key != 0 && keyPlus1 % 12 == 0 ? (
                    <div className="col-12">
                      <GA
                        adClient="ca-pub-4468477322781117"
                        adSlot="4316048838"
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              )
            })}
          </div>
        ) : null
      ) : null}

      {is_loading ? <Loader /> : null}

      {status && status !== 200 ? <Error text={message} /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length < total ? (
        <div className="grid-center" style={{ margin: "20px 0 40px" }}>
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Event Berikutnya" : "Loading..."}
            size="large"
            onClick={() => props.loadmoreHandler()}
          />
        </div>
      ) : null}

      {!props.hideAds ? (
        <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />
      ) : null}
    </EventsBoxStyled>
  )
}

export default EventsBox
