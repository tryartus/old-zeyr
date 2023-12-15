import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { userMention } from "discord.js";

@RegisterSubCommand("developer", (builder) =>
	builder
		.setName("prime")
		.setDescription('gives an user the "prime status"')
		.addStringOption((opt) =>
			opt.setName("user").setDescription("user's id").setRequired(true),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const uid = interaction.options.getString("user", true);

		const user = await this.container.utilities.db.getUser(uid);

		if (user?.primeStatus) {
			return interaction.reply("this user already has prime status");
		} else {
			await this.container.prisma.user.update({
				where: {
					id: uid,
				},
				data: {
					primeStatus: true,
				},
			});

			return interaction.reply(
				`successfully given ${userMention(uid)} the prime status`,
			);
		}
	}
}
