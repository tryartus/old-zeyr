import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { ApplyOptions } from "@sapphire/decorators";
import { createPistonClient } from "ts-piston";

@ApplyOptions<Command.Options>({
	enabled: false,
})
@RegisterSubCommand("util", (builder) =>
	builder
		.setName("code")
		.setDescription("execute code")
		.addStringOption((option) =>
			option
				.setName("code")
				.setDescription("code to execute")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("language")
				.setDescription("language of the code")
				.setRequired(true),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const code = interaction.options.getString("code", true);
		const language = interaction.options.getString("language", true);
		const client = createPistonClient();

		const execute = await client.execute({
			language,
			version: "*",
			files: [
				{
					content: code,
				},
			],
			args: [
				/** soon (when im NOT lazy) */
			],
		});

		if (execute.type === "error")
			return interaction.reply({
				content: `\`\`\`xl\n${execute.message}\`\`\``,
			});
		return interaction.reply({
			content: `\`\`\`${language}\n${execute.run.output}\`\`\``,
		});
	}
}
