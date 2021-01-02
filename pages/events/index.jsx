import React, { useEffect, useState } from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { progressBar } from "../../modules/loaders"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import EventsBox from "../../components/boxs/EventsBox"

//actions
import { fetchEvents, fetchMoreEvents } from "../../redux/events/actions"

const EventsStyled = Styled.div`

`

const MaxResults = 9

const Events = (props) => {
  const [query, setQuery] = useState(props.query)

  const [almostBottom, setAlmostBottom] = useState(false)

  const StoreFilter = `list_${query.show_all || 0}`
  const events = props.events[StoreFilter] || {}

  const Breadcrumb = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/events",
      title: "Events",
    },
  ]

  if (events.status) progressBar.stop()

  const metadata = {
    title: "Events - Mau Gowes",
    description: "Kumpulan info race, tour gowes se Indonesia",
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      progressBar.start()

      if (!events.status && !events.is_loading) {
        const reqQuery = requestQueryGenerator(query)
        props.dispatch(fetchEvents(StoreFilter, reqQuery))
      }

      // scroll listener
      document.addEventListener("scroll", loadMoreHandler)
    }

    return () => {
      document.removeEventListener("scroll", loadMoreHandler)
    }
  }, [])

  useEffect(() => {
    if (almostBottom && !events.is_loading && events.status == 200) {
      const NextPage = Math.floor(events.results.length / MaxResults) + 1

      let reqQuery = {
        limit: MaxResults,
        page: NextPage,
        show_all: query.show_all || 0,
      }
      if (props.tag) reqQuery.tag = props.tag

      props.dispatch(fetchMoreEvents(StoreFilter, reqQuery))
    }
  }, [almostBottom])

  //load more handler
  const loadMoreHandler = () => {
    return setAlmostBottom(
      window.innerHeight + window.scrollY >= document.body.offsetHeight / 1.5
    )
  }

  useEffect(() => {
    if (!events.status && !events.is_loading) {
      const reqQuery = requestQueryGenerator(query)
      props.dispatch(fetchEvents(StoreFilter, reqQuery))
    }
  }, [props.query])

  return (
    <GlobalLayout metadata={metadata}>
      <DefaultLayout>
        <EventsStyled>
          <Header
            breadcrumb={Breadcrumb}
            title="Events - Mau Gowes"
            text={metadata.description}
            stats={{
              suffix: "events",
              total: events.total || 0,
              show:
                events.results && events.results.length
                  ? events.results.length
                  : 0,
            }}
          />
          <EventsBox
            data={events}
            noHeaderTitle
            maxResults={MaxResults}
            useFilter
            setState={(n) => {
              setQuery(n)
            }}
            query={query}
          />
        </EventsStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

Events.getInitialProps = async ({ req, reduxStore, query }) => {
  if (req) {
    const StoreFilter = `list_${query.show_all || 0}`
    const reqQuery = requestQueryGenerator(query)
    await reduxStore.dispatch(fetchEvents(StoreFilter, reqQuery))
  }

  return {
    query,
  }
}

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
    status: "accept",
    show_all: query.show_all || 0,
  }

  if (query.tag) reqQuery.tag = query.tag
  if (query.username) reqQuery.username = query.username

  return reqQuery
}

export default connect((state) => {
  return {
    events: state.Events,
  }
})(Events)
