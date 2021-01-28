import { receiveDataByFilter } from "../modules/reducerHandler"
import { GET_GROUP_SPEC } from "./actions"

const GroupSpecsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_GROUP_SPEC:
      return receiveDataByFilter(state, action)
    default:
      return state
  }
}

export default GroupSpecsReducer
