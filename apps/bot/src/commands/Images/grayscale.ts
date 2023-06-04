import { lastMedia, optimalFileName } from "../../lib/util";
import { LanguageKeys } from "../../lib/util/i18n/keys";
import {
	Command,
	RegisterSubCommand
} from "@kaname-png/plugin-subcommands-advanced";
import { resolveKey } from "@sapphire/plugin-i18next";
import { Stopwatch } from "@sapphire/stopwatch";
import { cast } from "@sapphire/utilities";
import { AttachmentBuilder } from "discord.js";

@RegisterSubCommand("image", (builder) =>
	builder
		.setName("grayscale")
		.setDescription("Turn a image in black & white")
		.addAttachmentOption((o) =>
			o
				.setName("image")
				.setDescription("Image to manipulate")
				.setRequired(false)
		)
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">
	) {
		await interaction.deferReply({ fetchReply: true });
		const stopwatch = new Stopwatch();

		const image =
			interaction.options.getAttachment("image") ??
			(await lastMedia(interaction.channel!));

		if (!image)
			return interaction.editReply(
				await resolveKey(interaction.guild, LanguageKeys.Images.InvalidImage)
			);

		const output = await this.container.utilities.image.sharp(
			image.proxyURL ?? image.url
		);

		output.grayscale();

		const buffer = await output.png().toBuffer();
		const file = new AttachmentBuilder(Buffer.from(buffer), {
			name: optimalFileName("png")
		});

		return interaction.editReply({
			content: cast<string>(
				await resolveKey(
					interaction.guild,
					LanguageKeys.General.StopwatchFinished,
					{
						time: stopwatch.stop().toString()
					}
				)
			),
			files: [file]
		});
	}
}
