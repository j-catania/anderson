import ConfigService from './ConfigService.js'
import HttpChecker from './checker/HttpChecker.js'
import NotifierService from './notifier/NotifierService.js'
import Express from './Express.js'

const { log } = console

/**
 * @type {number[]}
 */
const intervals = []
/**
 * @type {ServiceStatus[]}
 */
const serviceStatuses = []
/**
 * @type {Service[]}
 */
let services

const start = ({ version }) => async (opts) => {
  const config = await ConfigService.get(opts.configFile)

  services = config.services

  Express.init(+opts.port, serviceStatuses)

  if (opts.hello) NotifierService.hello(services, version)

  services.forEach((service) => {
    /**
     * @type {ServiceStatus}
     */
    let status = {
      name: service.name, status: 'unknown', date: new Date()
    }
    serviceStatuses.push(status)

    const inter = setInterval(async () => {
      switch (service.type ?? 'http') {
        case 'http': {
          status = await HttpChecker.check(service, status)
          const serviceStatus = serviceStatuses.find((s) => s.name === service.name)
          serviceStatus.status = status.status
          serviceStatus.date = status.date
          break
        }
        default:
      }
    }, service.interval ?? 5000)
    intervals.push(inter)
  })

  log(`Services lookup '${serviceStatuses.map((k) => k.name).join(', ')}' started`)

  if (opts.verbose) {
    setInterval(() => {
      log(serviceStatuses)
    }, 1000)
  }
}

const stop = () => NotifierService.goodbye(services)

const eMusk = {
  start,
  stop
}

export default eMusk
