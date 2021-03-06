import Styled from "styled-components"
import { fetchBlogDetail } from "../../../redux/blog/actions"
import { connect } from "react-redux"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import PostForm from "../../../components/form/PostForm"

const BlogCreateStyled = Styled.div`

`

const BlogForm = ({ id, blog, dispatch }) => {
  const title = id ? "Update Post" : "Create Post"
  const blogData = blog[id] || {}
  const formResponse = blog.submit_post || {}
  const { is_loading } = blogData
  return (
    <GlobalLayout metadata={{ title }}>
      <DefaultLayout>
        <SuperLayout>
          <BlogCreateStyled className="p-t-b-30">
            <PageHeader title={title} />
            {is_loading ? (
              <Loading />
            ) : (
              <PostForm
                dispatch={dispatch}
                blogData={blogData}
                formResponse={formResponse}
                isEdit={blogData && blogData.id}
              />
            )}
          </BlogCreateStyled>
        </SuperLayout>
      </DefaultLayout>
    </GlobalLayout>
  )
}

BlogForm.getInitialProps = async ({ query, reduxStore }) => {
  const { id } = query

  if (id) {
    await reduxStore.dispatch(fetchBlogDetail(id))
  }

  return {
    id,
  }
}

export default connect((state) => {
  return {
    blog: state.Blog,
  }
})(BlogForm)
