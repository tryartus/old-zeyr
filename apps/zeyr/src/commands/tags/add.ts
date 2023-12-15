import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { UserError } from "@sapphire/framework";
import { Result } from "@sapphire/result";

@RegisterSubCommand("tags", (builder) =>
	builder
		.setName("add")
		.setDescription("create a new tag for the current guild")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("name of the tag")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("content")
				.setDescription("content of the tag")
				.setRequired(true),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const name = interaction.options.getString("name", true);
		const content = interaction.options.getString("content", true);

		const tagExists = await Result.fromAsync(
			async () => await this.getTag(name, interaction.guildId),
		);

		const tag = tagExists.unwrap();

		if (tag)
			throw new UserError({
				message: "the tag already exists",
				identifier: "TagAlreadyExists",
			});

		await this.container.prisma.tag.create({
			data: {
				content,
				name,
				memberId: interaction.user.id,
				guildId: interaction.guildId,
			},
		});

		return interaction.reply({
			content: "the tag was succesfully added",
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
