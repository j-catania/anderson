import fetch from 'node-fetch'
import NotifierService from '../notifier/NotifierService.js'

/**
 *
 * @param {Service} service
 * @param {ServiceStatus} status
 * @returns {Promise<ServiceStatus>}
 */
const check = async (service, status) => {
  const myStatus = { ...status }
  const url = `${(service.secure ?? true) ? 'https' : 'http'}://${service.host}${service.port ? `:${service.port}` : ''}${service.path ?? ''}`
  const controller = new AbortController()

  const timeout = setTimeout(() => {
    controller.abort()
  }, service.timeout ?? 1000)

  try {
    const resp = await fetch(url, { method: service.method ?? 'GET', signal: controller.signal })
    if (!resp.ok) {
      throw new Error(`${resp.status} ${resp.statusText}`)
    }
    if (myStatus.status === 'offline') {
      NotifierService.notify(service, 'online')
      myStatus.message = undefined
    }
    myStatus.status = 'online'
  } catch (error) {
    myStatus.message = error.message
    if (status.status === 'online') {
      NotifierService.notify(service, 'offline', status.message)
    }
    myStatus.status = 'offline'
  } finally {
    myStatus.date = new Date()
    clearTimeout(timeout)
  }
  return myStatus
}

const HttpChecker = {
  check
}

export default HttpChecker
