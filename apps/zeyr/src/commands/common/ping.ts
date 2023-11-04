import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { Message } from "discord.js";

@RegisterSubCommand("common", (builder) =>
	builder.setName("ping").setDescription("Check the bot's ping"),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		return interaction.reply("uwu");
	}

	public override async messageRun(ctx: Message) {
		return ctx.reply("uwu");
	}
}
