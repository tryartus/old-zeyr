import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { objectEntries } from "@sapphire/utilities";

@RegisterSubCommand("common", (builder) =>
	builder.setName("ping").setDescription("check zeyr latency"),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const initial = await interaction.deferReply({ fetchReply: true });

		const ping = {
			interaction: Math.round(
				initial.createdTimestamp - interaction.createdTimestamp,
			),
			ws: Math.round(this.container.client.ws.ping),
		};

		return interaction.editReply(
			objectEntries(ping)
				.map(([name, value]) => `${name}: ${value}ms`)
				.join("\n"),
		);
	}
}
