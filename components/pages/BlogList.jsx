import { useEffect } from "react"
import { connect } from "react-redux"
import { fetchBlog, fetchMoreBlog } from "../../redux/blog/actions"
import { toSlug } from "string-manager"
import { progressBar } from "../../modules/loaders"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import Header from "../../components/boxs/FullWidthHeader"
import BlogBox from "../../components/boxs/BlogBox"

const Breadcrumb = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/blog",
    title: "Blog",
  },
]

const StoreFilter = "list"
const MaxResults = 9
let Page = 1

const Blog = (props) => {
  const { tag, username, query } = props
  const Filter = filterGenerator(query)
  const blogState = props.blog[Filter] || {}

  // metadata generator
  let title = "Blog - Mau Gowes"
  if (tag) {
    title = `Postingan Dengan Tag "${tag}" - Mau Gowes`
  } else if (username) {
    title = `Postingan dari "${username}" - Mau Gowes`
  }

  // componentDidMount and componentWillUnmount Handlers
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("scroll", loadMoreHandler)
    }

    return () => {
      document.removeEventListener("scroll", loadMoreHandler)
    }
  }, [])

  useEffect(() => {
    if (!blogState.status && !blogState.is_loading) {
      if (typeof window !== "undefined") progressBar.start()
      const reqQuery = requestQueryGenerator(query)
      props.dispatch(fetchBlog(Filter, reqQuery))
    }
  }, [query])

  // loadmore handler
  const loadMoreHandler = (e) => {
    // if scroll almost bottom
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight / 1.5
    ) {
      if (!blogState.is_loading && blogState.status == 200) {
        // you're at the almost bottom of the page
        Page = Page + 1

        let reqQuery = {
          limit: MaxResults,
          page: Page,
        }
        if (tag) reqQuery.tag = this.props.tag

        props.dispatch(fetchMoreBlog(Filter, reqQuery))
      }
    }
  }

  // stop page loader stop
  if (blogState.status) progressBar.stop()

  return (
    <GlobalLayout
      metadata={{
        title,
        description: `${title}. Baca postingan terupdate seputar dunia pergowesan`,
      }}>
      <DefaultLayout>
        <>
          <Header
            breadcrumb={Breadcrumb}
            title={title}
            text="Berbagi cerita seputar dunia sepeda"
            stats={{
              suffix: "post",
              total: blogState.total || 0,
              show:
                blogState.results && blogState.results.length
                  ? blogState.results.length
                  : 0,
            }}
          />
          <BlogBox
            noHeaderTitle
            maxResults={MaxResults}
            data={blogState}
            // loadmoreHandler={() => {
            //   setPage(page + 1)
            // }}
          />
        </>
      </DefaultLayout>
    </GlobalLayout>
  )
}

Blog.getInitialProps = async ({ req, reduxStore, query }) => {
  const Filter = filterGenerator(query)

  if (req) {
    const reqQuery = requestQueryGenerator(query)
    await reduxStore.dispatch(fetchBlog(Filter, reqQuery))
  }

  return {
    tag: query.tag || "",
    username: query.username,
    query,
  }
}

export function filterGenerator(query = {}) {
  let filter = StoreFilter

  if (query.tag) filter = toSlug(query.tag)
  if (query.username) filter = toSlug(query.username)

  return filter
}

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
  }

  if (query.tag) reqQuery.tag = query.tag
  if (query.username) reqQuery.username = query.username

  return reqQuery
}

export default connect((state) => {
  return {
    blog: state.Blog,
  }
})(Blog)
