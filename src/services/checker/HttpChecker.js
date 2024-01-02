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
    if (myStatus.status === 'down') {
      NotifierService.notify(service, 'up')
      myStatus.message = undefined
    }
    myStatus.status = 'up'
  } catch (error) {
    myStatus.message = error.message
    if (status.status === 'up') {
      NotifierService.notify(service, 'down', status.message)
    }
    myStatus.status = 'down'
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
