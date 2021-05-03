import { HandlerMessage, CommandInteraction } from '../../deps.ts';
import axiod from 'https://deno.land/x/axiod/mod.ts';
export default {
	name: 'crate',
	description: 'Search for a crate package',
	enabled: true,
	slash: true,
	category: 'general',
	async exec(message: HandlerMessage) {
		if (!message.args)
			return message.reply({
				content: '<:no:838017092216946748> Please provide a message',
			});
		const pkg = await axiod(`https://crates.io/api/v1/crates`, {
			method: 'GET',
			params: {
				q: message.args,
				max: '1',
			},
			headers: {},
		});
		if (!pkg?.data?.crates[0])
			return message.reply({
				content: '<:no:838017092216946748> Please provide a message',
			});
		const result = pkg.data.crates[0];
		message.channel?.send({
			embed: message
				.embed()
				.setColor('#3B6837')
				.setDescription(result.description || 'No description provided')
				.addField(
					'❯ repository',
					`[${result.repository.replace('https://', '')}](${
						result.repository
					})` || 'This crate doesnt seem to have a repository'
				)

				.addField('❯ Version', `${result.newest_version || 'Unspecified'}`)
				.addField('❯ Install', `\`cargo install ${result.id}\``)
				.addField(
					'❯ Downloads',
					`Total \`${result.downloads}\`\nRecent \`${result.recent_downloads}\``
				)
				.setTitle(
					`<:cargo:838484116768292905> ${result.name}`,
					`https://crates.io/crates/${result.id}`
				),
		});
	},
	SlashData: {
		options: [
			{
				type: 3,
				name: 'crate',
				description: 'The crate you want to search for',
				required: true,
			},
		],
	},
	async execSlash(interaction: CommandInteraction) {
		const query = interaction?.data?.options[0]?.value;
		const pkg = await axiod(`https://crates.io/api/v1/crates`, {
			method: 'GET',
			params: {
				q: query,
				max: '1',
			},
			headers: {},
		});
		if (!pkg?.data?.crates[0])
			return interaction.reply({
				content: '<:no:838017092216946748> Please provide a valid crate',
			});
		const result = pkg.data.crates[0];

		const embed = interaction
			.embed()
			.setColor('#3B6837')
			.setDescription(result.description || 'No description provided')
			.addField(
				'❯ repository',
				`[${result.repository.replace('https://', '')}](${
					result.repository
				})` || 'This crate doesnt seem to have a repository'
			)

			.addField('❯ Version', `${result.newest_version || 'Unspecified'}`)
			.addField('❯ Install', `\`cargo install ${result.id}\``)
			.addField(
				'❯ Downloads',
				`Total \`${result.downloads}\`\nRecent \`${result.recent_downloads}\``
			)
			.setTitle(
				`<:cargo:838484116768292905> ${result.name}`,
				`https://crates.io/crates/${result.id}`
			);
		interaction.reply({ content: 'crates', embeds: [embed] });
	},
};
