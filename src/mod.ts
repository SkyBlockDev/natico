import {
	startBot,
	Message,
	token,
	Interaction,
	naticoInteraction,
	naticoMessage,
	yellow,
	settings,
	white,
	DiscordenoMessage,
} from '../deps.ts';
import sweep from './tasks/sweep.ts';
import { commandHandler } from './client.ts';
console.log(white('[i]'), yellow('starting'));
await commandHandler.loadALL();
//deno docs stable https://doc.deno.land/builtin/stable
startBot({
	token,
	intents: ['Guilds', 'GuildMessages', 'GuildVoiceStates'],
	eventHandlers: {
		interactionCreate(interaction: Interaction) {
			commandHandler.runSlash(interaction as naticoInteraction);
		},
		async ready() {
			//if (settings.dev == true) {
			//	await commandHandler.enableSlash(settings.testserver);
			//}

			//editBotStatus("afk");
			console.log(white('[i]'), yellow('Bot succesfully started'));
			setInterval(() => {
				sweep.exec();
			}, sweep.delay);
		},
		messageCreate(message: DiscordenoMessage) {
			commandHandler.handleCommand(message as naticoMessage);
		},
		messageUpdate(message: DiscordenoMessage) {
			commandHandler.handleCommand(message as naticoMessage);
		},
	},
});
