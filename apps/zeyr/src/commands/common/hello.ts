import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { Message } from "discord.js";

@RegisterSubCommand("common", (builder) =>
	builder.setName("hello").setDescription("Hello! :-)"),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		return interaction.reply("HI (from slash)");
	}

	public override async messageRun(ctx: Message) {
		return ctx.reply("HI (from messahe)");
	}
}
