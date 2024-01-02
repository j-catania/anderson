// test all NotifierService methods
import { jest } from '@jest/globals'
import NotifierService from './NotifierService.js'

const mockNotify = jest.fn()
const mockHello = jest.fn()
const mockGoodbye = jest.fn()

jest.mock('./providers/DiscordNotifierProvider.js', () => ({
  hello: mockHello,
  goodbye: mockGoodbye,
  notify: mockNotify
}))

describe('NotifierService', () => {
  const services = [
    {
      name: 'test',
      notifiers: [
        {
          type: 'discord',
          webhook: '1234'
        }
      ]
    },
    {
      name: 'test2',
      notifiers: [
        {
          type: 'discord',
          webhook: '1234'
        }
      ]
    },
    {
      name: 'test3',
      notifiers: [
        {
          type: 'discord',
          webhook: '1234'
        }
      ]
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('notify', () => {
    it('should call notify for each notifier', () => {
      NotifierService.notify(services[0], 'UP')
      expect(mockNotify).toHaveBeenCalledTimes(1)
    })
  })

  describe('hello', () => {
    it('should call hello for each notifier', () => {
      NotifierService.hello(services)
      expect(mockHello).toHaveBeenCalledTimes(3)
    })
  })

  describe('goodbye', () => {
    it('should call goodbye for each notifier', () => {
      NotifierService.goodbye(services)
      expect(mockGoodbye).toHaveBeenCalledTimes(3)
    })
  })
})
