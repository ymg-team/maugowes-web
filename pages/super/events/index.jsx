import React from "react"
import { connect } from "react-redux"
import { fetchEvents, fetchMoreEvents } from "../../../redux/events/actions"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import EventBox from "../../../components/super/boxs/EventBox"

const MaxResults = 9
let StoreFilter = "super"

class EventLists extends React.Component {
  state = {
    page: 1,
  }

  componentDidMount() {
    const eventState = this.props.events[StoreFilter] || {}
    if (!eventState.status && !eventState.is_loading) {
      const reqQuery = {
        show_all: 1,
        status: "all",
      }
      reqQuery.showDraft = true
      this.props.dispatch(fetchEvents(StoreFilter, reqQuery))
    }
  }

  loadmoreHandler() {
    const eventState = this.props.events[StoreFilter] || {}
    if (!eventState.is_loading && eventState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page,
            showDraft: true,
            status: "all",
          }

          return this.props.dispatch(fetchMoreEvents(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const title = "Events Management"
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <div className="p-t-b-30">
              <PageHeader title={title} />
              <EventBox
                data={this.props.events.super || ""}
                loadmoreHandler={() => this.loadmoreHandler()}
                maxResults={MaxResults}
              />
            </div>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect((state) => {
  return {
    events: state.Events,
  }
})(EventLists)
