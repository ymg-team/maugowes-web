import React from "react"
import Styled from "styled-components"

// redux
import { fetchEventDetail } from "../../../../redux/events/actions"
import { connect } from "react-redux"

// components
import GlobalLayout from "../../../../components/layouts/Global"
import DefaultLayout from "../../../../components/layouts/Default"
import SuperLayout from "../../../../components/layouts/Super"
import PageHeader from "../../../../components/boxs/PageHeader"
import EventDetail from "../../../../components/super/boxs/EventDetail"

const BlogCreateStyled = Styled.div`

`

class DetailPage extends React.Component {
  state = {}

  static async getInitialProps({ req, reduxStore, query }) {
    if (typeof query.id != "undefined" && req) {
      await reduxStore.dispatch(fetchEventDetail(query.id))
    }

    return { id: query.id }
  }

  render() {
    const { id } = this.props
    const title = "Event Detail"
    const eventData = this.props.events[id] || {}
    const formResponse = this.props.events.submit_post || {}
    const { is_loading } = eventData
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogCreateStyled className="p-t-b-30">
              <PageHeader title={title} />
              {is_loading ? (
                <Loading />
              ) : (
                <EventDetail
                  dispatch={this.props.dispatch}
                  formResponse={formResponse}
                  eventData={eventData}
                />
              )}
            </BlogCreateStyled>
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
})(DetailPage)
