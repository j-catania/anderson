import DiscordNotifierProvider from './providers/DiscordNotifierProvider.js'

/**
 * Notify all notifiers with the given status
 * @param {Service} service
 * @param {Status} status
 * @param {string=} desc
 */
const notify = (service, status, desc) => {
  service.notifiers?.forEach((notifier) => {
    switch (notifier.type) {
      case 'discord': {
        DiscordNotifierProvider.notify(service.name, status, notifier, desc)
        break
      }
      default:
    }
  })
}

/**
 * Send message to all notifiers for saying hello
 * @param {Service[]} s
 */
const hello = (s) => {
  const services = s.filter((ss) => ss.notifiers?.length > 0)

  services.forEach((service) => {
    service.notifiers.forEach((notifier) => {
      switch (notifier.type) {
        case 'discord': {
          DiscordNotifierProvider.hello(service.name, notifier)
          break
        }
        default:
      }
    })
  })
}

/**
 * Send message to all notifiers for saying goodbye
 * @param {Service[]} s
 */
const goodbye = (s) => {
  const services = s?.filter((ss) => ss.notifiers?.length > 0)
  const proms = services?.map((service) => service.notifiers
    .map((notifier) => {
      let rt
      switch (notifier.type) {
        case 'discord': {
          rt = DiscordNotifierProvider.goodbye(service.name, notifier)
          break
        }
        default:
      }
      return rt
    })).flat()

  return Promise.all(proms)
}

const NotifierService = { notify, hello, goodbye }

export default NotifierService
