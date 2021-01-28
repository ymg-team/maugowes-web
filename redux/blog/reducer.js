import { GET_BLOG, GET_MORE_BLOG, SUBMIT_FORM } from "./actions"
import {
  receiveDataByFilter,
  receiveMoreDataByFilter,
} from "../modules/reducerHandler"

const BlogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BLOG:
    case SUBMIT_FORM:
      return receiveDataByFilter(state, action)

    case GET_MORE_BLOG:
      return receiveMoreDataByFilter(state, action)

    default:
      return state
  }
}

export default BlogReducer
