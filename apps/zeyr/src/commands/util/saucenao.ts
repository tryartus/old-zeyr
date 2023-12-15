import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Colors, EmbedBuilder } from "discord.js";
import { getLastImage } from "../../lib/util/discord";

@RegisterSubCommand("util", (builder) =>
	builder
		.setName("saucenao")
		.setDescription("search the original image of media")
		.addStringOption((option) =>
			option.setName("url").setDescription("image url").setRequired(false),
		)
		.addNumberOption((option) =>
			option
				.setName("results")
				.setDescription("number of results")
				.setMinValue(1)
				.setMaxValue(20)
				.setRequired(false),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const url =
			interaction.options.getString("url", false) ??
			(await getLastImage(interaction.channel!));
		const results = interaction.options.getNumber("results", false);

		if (!url)
			return interaction.editReply({
				content: "you did not provide a valid image",
			});

		const paginate = new PaginatedMessage({
			template: new EmbedBuilder().setColor(Colors.Blurple),
		});

		const sources = await this.container.api.sauce(url, results);

		for (const source of sources.results) {
			paginate.addPageEmbed((embed) =>
				embed
					.setAuthor({
						name: source.authorName ?? "Unknown",
					})
					.setTitle(source.site)
					.setURL(source.url)
					.setImage(source.thumbnail),
			);
		}

		return await paginate.run(interaction);
	}
}
