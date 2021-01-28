import config from "../../config/index"
import superagent from "superagent"
import toast from "../../modules/toast"

export const CALL_API = "CALL_API"

const ReqApiMiddleware = (store) => (next) => (action) => {
  return new Promise((resolve, reject) => {
    //action no requset data from server
    if (!action[CALL_API]) {
      next(action)
      resolve()
    } else {
      let { formdata = {} } = action[CALL_API]
      const { method = "GET", endpoint, options = {}, filter, type } = action[
        CALL_API
      ]

      // set to loading in state, only on client side
      if (typeof window != "undefined") {
        next({
          type,
          filter,
          options,
        })
      }

      // start to request to api and store response to state
      const requestUrl = `${config[process.env.NODE_ENV].host}${endpoint}`
      const methodNormalize = method.toLowerCase()

      if (typeof window !== "undefined" && typeof formdata !== "undefined")
        formdata = formdataGenerator(formdata)

      return superagent[methodNormalize](requestUrl)
        .set("Accept", "application/json")
        .send(formdata)
        .then((response) => {
          let data = response.body

          if (typeof data !== "object") {
            data = {
              status: 500,
              message: "Error: response not valid",
            }
          }

          if (
            methodNormalize != "get" &&
            (data.status !== 200 || data.status !== 201)
          ) {
            toast(true, data.message || "Error: response not valid", "error")
          }

          next({
            type,
            filter,
            options,
            data,
          })

          resolve()
        })
        .catch((err) => console.error("redux error : ", err))
    }
  })
}

// formdata generator
function formdataGenerator(params) {
  let formdata = new FormData()
  // return params
  Object.keys(params).map((n) => {
    formdata.append(n, params[n])
  })

  return formdata
}

export default ReqApiMiddleware
