const { createProxyMiddleware } = require('http-proxy-middleware')
const dotenv = require('dotenv')

/**
 * @typedef {import('express').Express} Express
 */

dotenv.config()

const port = Number(process.env.SERVER_PORT) || Number(process.env.PORT) || 5000

/**
 * @param {Express} app
 */
module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: `http://localhost:${port}/`,
    changeOrigin: true
  }))
}
