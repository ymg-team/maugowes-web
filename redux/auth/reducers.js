import { LOGIN } from "./actions"

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      if (action.data && action.data.status) {
        state = action.data
        state.is_loading = false
      } else {
        state.is_loading = true
      }
      return Object.assign({}, state)
    default:
      return state
  }
}

export default AuthReducer
