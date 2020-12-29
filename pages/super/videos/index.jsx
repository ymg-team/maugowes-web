import React from "react"
import { connect } from "react-redux"
import { fetchVideos, fetchMoreVideos } from "../../../redux/videos/actions"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import VideoBox from "../../../components/super/boxs/VideoBox"
import { requestQueryGenerator } from "../../videos/index"

const MaxResults = 9
let StoreFilter = "super"

class VideoList extends React.Component {
  state = {
    page: 1,
  }

  componentDidMount() {
    const videoState = this.props.videos[StoreFilter] || {}
    if (!videoState.status && !videoState.is_loading) {
      const reqQuery = requestQueryGenerator(this.props.query)
      reqQuery.showDraft = true
      this.props.dispatch(fetchVideos(StoreFilter, reqQuery))
    }
  }

  loadmoreHandler() {
    const videoState = this.props.videos[StoreFilter] || {}
    if (!videoState.is_loading && videoState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page,
            showDraft: true,
          }

          return this.props.dispatch(fetchMoreVideos(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const title = "Videos Management"
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <div className="p-t-b-30">
              <PageHeader title={title} />
              <VideoBox
                data={this.props.videos.super || ""}
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
    videos: state.Videos,
  }
})(VideoList)
