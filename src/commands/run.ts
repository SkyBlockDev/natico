import { naticoMessage } from '../../deps.ts';
import Command from '../../lib/Command.ts';
export default class run extends Command {
	constructor() {
		super('run', {
			name: 'run',
			aliases: ['run', 'exec', 'sh'],
			examples: ['eval message'],
			description: 'Eval some super javascript deno code',
			enabled: true,
			slash: false,
			required: true,
			category: 'dev',
			ownerOnly: true,
		});
	}
	async exec(message: naticoMessage, { args }: { args: string }) {
		try {
			const out = Deno.run({
				cmd: args.split(' '),
				stdout: 'piped',
				stderr: 'piped',
			});
			const rawOutput = await out.output();
			return message.reply(
				'out\n```bash\n' + new TextDecoder().decode(rawOutput) || '\n' + '\n```'
			);
		} catch (e) {
			message.reply(`${e}`);
		}
	}
}