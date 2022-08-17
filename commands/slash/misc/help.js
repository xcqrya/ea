const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	Permissions,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all commands of bot"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		const client = interaction.client;

		const helpEmbed = new MessageEmbed()
			.setColor(`RED`)
			.setAuthor(
				`${interaction.user.username}`,
				`${interaction.user.avatarURL({ dynamic: true })}`,
				`https://discord.com/users/${interaction.user.id}`
			)
			.setDescription(
				`Hey there! I am ${client.user.username}, a  bot programmed by **[ItzHexayan](https://github.com/xcqrya)** I'am playing music for you :D.\n I'am support Spotify,Youtube and Soundcloud my commands are listed bellow -`
			)
			.setTitle(`**${client.user.username}**`)
			.setThumbnail(client.user.avatarURL({ dynamic: true }))
			.setFooter(
				`${client.user.username.toUpperCase()} ${new Date().getFullYear()}`,
				client.user.avatarURL({ dynamic: true })
			)
			.setTimestamp();

		commands.map((command) =>
			helpEmbed.addField(
				`>>> \`/${command.data.name.toLowerCase().replace("_", "-")}\``,
				command.data.description,
				true
			)
		);
		const invite = client.generateInvite({
			permissions: [Permissions.FLAGS.ADMINISTRATOR],
			scopes: ["bot", "applications.commands"],
		});
		const kool = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Invite")
				.setStyle("LINK")
				.setURL(invite)
				.setEmoji("🔗"),
			new MessageButton()
				.setLabel("Github")
				.setStyle("LINK")
				.setURL("https://github.com/xcqrya")
				.setEmoji("744345792172654643"),
			new MessageButton()
				.setLabel("Youtube")
				.setStyle("LINK")
				.setURL("https://youtube.com/c/itzhexayan")
				.setEmoji("🌐")
		);

		await interaction.editReply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
