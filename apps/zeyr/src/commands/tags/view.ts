import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { UserError } from "@sapphire/framework";
import { Result } from "@sapphire/result";

@RegisterSubCommand("tags", (builder) =>
	builder
		.setName("view")
		.setDescription("execute and display a tag")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("name of the tag")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("arguments")
				.setDescription("extra arguments of the code")
				.setRequired(false),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const name = interaction.options.getString("name", true);
		const args = interaction.options.getString("arguments", false);

		const tagResult = await Result.fromAsync(
			async () => await this.getTag(name, interaction.guildId),
		);

		const tag = await tagResult.unwrapOrElse(async () => {
			throw new UserError({
				identifier: "TagNotExist",
				message: "The tag does not exists",
				context: {
					silent: true,
				},
			});
		});

		const finalTag = await this.container.tags.format(tag!.content, args ?? "");

		return interaction.reply({
			content: finalTag.body ?? "no content returned from tag",
		});
	}

	public async getTag(name: string, guildId: string) {
		return this.container.prisma.tag.findFirst({
			where: {
				name,
				guildId,
			},
			include: {
				author: true,
			},
		});
	}
}
