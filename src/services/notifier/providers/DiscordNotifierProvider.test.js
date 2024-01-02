import { jest } from '@jest/globals'

const mockMessageBuilder = jest.fn().mockImplementation(() => ({
  setName: jest.fn().mockReturnThis(),
  setColor: jest.fn().mockReturnThis(),
  setTitle: jest.fn().mockReturnThis(),
  setThumbnail: jest.fn().mockReturnThis(),
  setDescription: jest.fn().mockReturnThis(),
  addField: jest.fn().mockReturnThis()
}))
const mockWebhook = jest.fn().mockImplementation(() => ({
  setUsername: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnValue(Promise.resolve())
}))
jest.unstable_mockModule('discord-webhook-node', () => ({
  MessageBuilder: mockMessageBuilder,
  Webhook: mockWebhook
}))

describe('DiscordNotifierProvider', () => {
  let DiscordNotifierProvider
  beforeEach(async () => {
    jest.clearAllMocks()
    DiscordNotifierProvider = (await import('./DiscordNotifierProvider')).default
  })

  it('should notify discord', () => {
    DiscordNotifierProvider.notify('name', 'status', { webhook: 'http://plop' })
    expect(mockMessageBuilder)
      .toHaveBeenCalledTimes(1)
    expect(mockWebhook)
      .toHaveBeenCalledTimes(1)
  })

  it('should say hello to discord', () => {
    DiscordNotifierProvider.hello('name', { webhook: 'http://' })
    expect(mockMessageBuilder)
      .toHaveBeenCalledTimes(1)
    expect(mockWebhook)
      .toHaveBeenCalledTimes(1)
  })

  it('should say goodbye to discord', async () => {
    await DiscordNotifierProvider.goodbye('name', { webhook: 'http://' })
    expect(mockMessageBuilder)
      .toHaveBeenCalledTimes(1)
    expect(mockWebhook)
      .toHaveBeenCalledTimes(1)
  })
})
