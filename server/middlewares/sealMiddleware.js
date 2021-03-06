const sealMiddleware = require("seal-middleware")

const seal = new sealMiddleware.default(process.env.API_KEY, 60000)

module.exports = (req, res, next) => {
  const { is_valid } = seal.validate(req.params.seal)
  // if (is_valid || process.env.NODE_ENV === "development") {
  if (is_valid || process.env.NODE_ENV != "production") {
    return next()
  } else {
    res.json({
      status: 403,
      message: "Anda tidak memiliki akses disini"
    })
  }
}
