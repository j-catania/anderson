import express from 'express'

let app
/**
 * @param {number} port
 * @param {ServiceStatus[]} serviceStatuses
 * @returns {Server}
 */
const init = (port, serviceStatuses) => {
  app = express()

  app.get('/', function (req, res) {
    res.send(serviceStatuses)
  })

  return app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
}

const Express = {
  init
}

export default Express
