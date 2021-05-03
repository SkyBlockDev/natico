import CommandHandler from './commandHandler.ts';
import { join, Message, settings } from '../deps.ts';

export const commandHandler: CommandHandler = new CommandHandler({
	dir: join(Deno.cwd(), 'src', 'commands'),
	cooldown: 5000, // 5 seconds
	guildonly: true,
	prefix: async (message: Message) => {
		return message.guild
			? ['l!', 'Natico', 'l?', 'l-', 'n!']
			: ['l!', 'Natico', 'l?', 'l-', 'n!'];

		//[('l!', 'Natico', 'l?', 'l-')];
	},
	owners: settings.ids.owner,
});
