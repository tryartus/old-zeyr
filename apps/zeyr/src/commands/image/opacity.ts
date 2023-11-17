import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { AttachmentBuilder } from "discord.js";
import { getLastImage } from "../../lib/util/discord";

@RegisterSubCommand("image", (builder) =>
	builder
		.setName("opacity")
		.setDescription("plays with an image's transparency")
		.addNumberOption((option) =>
			option
				.setName("opacity")
				.setDescription("Opacity level")
				.setMaxValue(1)
				.setMinValue(0)
				.setRequired(true),
		)
		.addAttachmentOption((option) =>
			option.setName("image").setDescription("Image").setRequired(false),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		await interaction.deferReply({ fetchReply: true });
		const image =
			interaction.options.getAttachment("image", false)?.proxyURL ??
			(await getLastImage(interaction.channel!));
		const opacity = interaction.options.getNumber("opacity", true);

		if (!image)
			return interaction.editReply({
				content: "you did not provide a valid image",
			});

		const result = await this.container.api.opacity(image, opacity.toString());

		return interaction.editReply({
			content: "done",
			files: [new AttachmentBuilder(result)],
		});
	}
}
