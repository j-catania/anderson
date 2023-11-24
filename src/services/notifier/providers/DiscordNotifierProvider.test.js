import { jest } from '@jest/globals';
import { MessageBuilder, Webhook } from 'discord-webhook-node';
import DiscordNotifierProvider from './DiscordNotifierProvider';

const plop = jest.fn();
jest.unstable_mockModule('discord-webhook-node', () => ({
  MessageBuilder,
  Webhook,
}));

describe('DiscordNotifierProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should notify discord', () => {
    DiscordNotifierProvider.notify('name', 'status', { webhook: 'http://plop' });
    expect(plop).toHaveBeenCalledTimes(1);
  });

  it('should say hello to discord', () => {
    DiscordNotifierProvider.hello('name', { webhook: 'http://' });
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('should say goodbye to discord', async () => {
    await DiscordNotifierProvider.goodbye('name', { webhook: 'http://' });
    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});
