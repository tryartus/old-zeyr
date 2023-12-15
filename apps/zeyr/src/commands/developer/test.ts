import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";

@RegisterSubCommand("developer", (builder) =>
	builder.setName("test").setDescription("test purposes"),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const _t = this.container.client.emit("guildMemberAdd", interaction.member);
		if (_t) return interaction.reply("ok");
		else return interaction.reply("no");
	}
}
