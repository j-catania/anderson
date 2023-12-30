import express from 'express'
import client from 'prom-client'

/**
 * @param {number} port
 * @param {ServiceStatus[]} serviceStatuses
 */
const init = (port, serviceStatuses) => {
  const app = express()

  const register = new client.Registry()
  register.setDefaultLabels({
    app: 'emusk'
  })
  client.collectDefaultMetrics({ register })

  app.get('/', (req, res) => {
    res.send(serviceStatuses)
  })
  app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType)
    res.send(await register.metrics())
  })

  const server = app.listen(port, () => {
    console.log(`Service statuses are available on http://localhost:${port}`)
    console.log(`Metrics are available on http://localhost:${port}/metrics`)
  })

  return {server}
}

const Express = {
  init
}

export default Express
