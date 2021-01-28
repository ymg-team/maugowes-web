import { GET_BIKE, GET_MORE_BIKE, SUBMIT_BIKE } from "./actions"
import {
  receiveDataByFilter,
  receiveMoreDataByFilter,
} from "../modules/reducerHandler"

const BikesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BIKE:
    case SUBMIT_BIKE:
      return receiveDataByFilter(state, action)
    case GET_MORE_BIKE:
      return receiveMoreDataByFilter(state, action)
    default:
      return state
  }
}

export default BikesReducer
