import React from "react"
import Styled from "styled-components"
import { requestQueryGenerator } from "../../../components/pages/BlogList"
import { connect } from "react-redux"
import { fetchBlog, fetchMoreBlog } from "../../../redux/blog/actions"

// layouts
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"

// components
import PageHeader from "../../../components/boxs/PageHeader"
import BlogBox from "../../../components/super/boxs/BlogBox"

const BlogPageStyled = Styled.div`

`
const MaxResults = 9
let StoreFilter = "super"

class BlogPage extends React.Component {
  state = {
    page: 1,
  }

  static async getInitialProps({ reduxStore, query }) {
    return {
      tag: query.tag || "",
      username: query.username,
      query,
    }
  }

  componentDidMount() {
    const blogState = this.props.blog[StoreFilter] || {}
    if (!blogState.status && !blogState.is_loading) {
      const reqQuery = requestQueryGenerator(this.props.query)
      reqQuery.showDraft = true
      this.props.dispatch(fetchBlog(StoreFilter, reqQuery))
    }
  }

  loadmoreHandler() {
    const blogState = this.props.blog[StoreFilter] || {}
    if (!blogState.is_loading && blogState.status == 200) {
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
          if (this.props.tag) reqQuery.tag = this.props.tag

          return this.props.dispatch(fetchMoreBlog(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const blogState = this.props.blog[StoreFilter] || {}
    // const { is_loading } = blogState
    return (
      <GlobalLayout metadata={{ title: "Blog Management" }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogPageStyled className="p-t-b-30">
              <PageHeader title="Blog Management" />
              <BlogBox
                data={blogState}
                maxResults={MaxResults}
                loadmoreHandler={() => this.loadmoreHandler()}
              />
            </BlogPageStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect((state) => {
  return {
    blog: state.Blog,
  }
})(BlogPage)
