import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { AttachmentBuilder } from "discord.js";
import { getLastImage } from "../../lib/util/discord";

@RegisterSubCommand("image", (builder) =>
	builder
		.setName("invert")
		.setDescription("inverts an image colors")
		.addAttachmentOption((option) =>
			option
				.setName("image")
				.setDescription("Image to invert")
				.setRequired(false),
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

		if (!image)
			return interaction.editReply({
				content: "you did not provide a valid image",
			});

		const result = await this.container.api.invert(image);

		return interaction.editReply({
			content: "done",
			files: [new AttachmentBuilder(result)],
		});
	}
}
