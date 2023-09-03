import { Webhook, MessageBuilder } from 'discord-webhook-node';

const { error } = console;
/**
 * Notify all notifiers with the given status
 * @param service {Service}
 * @param status {Status}
 */
const notify = (service, status) => {
  service.notifiers.forEach((notifier) => {
    switch (notifier.type) {
      case 'discord': {
        const hook = new Webhook(notifier.webhook);
        const message = new MessageBuilder()
          .setTitle(`Service ${service.name} changed status`)
          .setAuthor('eMusk', 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.google.com')
          .setUrl('https://www.google.com')
          .addField('Service', service.name, true)
          .addField('Status', status)
          .setColor('#b71717')
          .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
          .setDescription('Oh look a description :)')
          .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
          .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
          .setTimestamp();

        hook.setUsername('eMusk');
        hook.send(message)
          .catch((r) => error(r));

        break;
      }
      default:
    }
  });
};

const NotifierService = { notify };

export default NotifierService;
