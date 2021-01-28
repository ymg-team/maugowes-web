import { GET_EVENTS, GET_MORE_EVENTS, SUBMIT_FORM } from "./actions"
import {
  receiveDataByFilter,
  receiveMoreDataByFilter,
} from "../modules/reducerHandler"

const EventsReducer = (state = {}, action) => {
  if (!state[action.filter]) state[action.filter] = {}

  switch (action.type) {
    case GET_EVENTS:
    case SUBMIT_FORM:
      return receiveDataByFilter(state, action)

    case GET_MORE_EVENTS:
      return receiveMoreDataByFilter(state, action)

    default:
      return state
  }
}

export default EventsReducer
