import { MessageBuilder, Webhook } from 'discord-webhook-node';

const { error } = console;

/**
 * Notify with discord
 * @param {string} name Service name
 * @param {Status} status Service status
 * @param {ServiceNotifier} notifier Service notifier information
 * @param {string=} desc Notify description
 */
const notify = (name, status, notifier, desc) => {
  const hook = new Webhook(notifier.webhook);
  const message = new MessageBuilder()
    .setTitle(`${name} status changed`)
    .addField('Service', name, true)
    .addField('Status', status)
    .setColor(status === 'down' ? '#b71717' : '#17b75c')
    .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
    .setDescription(desc ?? '');

  hook.setUsername('eMusk');
  hook.send(message)
    .catch((r) => error(r));
};

/**
 * Say hello to discord
 * @param {string} name Service name
 * @param {ServiceNotifier} notifier Service notifier information
 */
const hello = (name, notifier) => {
  const hook = new Webhook(notifier.webhook);
  const message = new MessageBuilder()
    .setTitle(`'${name}' is protected by eMusk`)
    .setColor('#5d0bda')
    .setDescription('Hello, I\'m eMusk, I\'m here to notify you when your service is down');

  hook.setUsername('eMusk');
  hook.send(message)
    .catch((r) => error(r));
};

/**
 * Say goodbye to discord
 * @param {string} name Service name
 * @param {ServiceNotifier} notifier Service notifier information
 * @returns {Promise<void>}
 */
const goodbye = (name, notifier) => {
  const hook = new Webhook(notifier.webhook);
  const message = new MessageBuilder()
    .setTitle(`'${name}' is no more protected by eMusk`)
    .setColor('#b7071f')
    .setDescription('Hello, eMusk is no more protecting your service');

  hook.setUsername('eMusk');
  return hook.send(message);
};

const DiscordNotifierProvider = {
  notify,
  hello,
  goodbye,
};

export default DiscordNotifierProvider;
