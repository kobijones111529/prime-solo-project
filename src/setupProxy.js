const { createProxyMiddleware } = require('http-proxy-middleware')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.SERVER_PORT || process.env.PORT || 5000

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: `http://localhost:${port}/`,
    changeOrigin: true
  }))
}
