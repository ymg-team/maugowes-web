import { GET_VIDEOS, GET_MORE_VIDEOS, SUBMIT_VIDEO } from "./actions"
import {
  receiveDataByFilter,
  receiveMoreDataByFilter,
} from "../modules/reducerHandler"

const VideosReducer = (state = {}, action) => {
  if (!state[action.filter]) state[action.filter] = {}

  switch (action.type) {
    case GET_VIDEOS:
    case SUBMIT_VIDEO:
      return receiveDataByFilter(state, action)

    case GET_MORE_VIDEOS:
      return receiveMoreDataByFilter(state, action)

    default:
      return state
  }
}

export default VideosReducer
