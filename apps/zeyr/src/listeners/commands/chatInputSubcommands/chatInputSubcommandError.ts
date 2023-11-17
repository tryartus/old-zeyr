import { Listener, UserError } from "@sapphire/framework";
import {
	ChatInputSubcommandErrorPayload,
	SubcommandPluginEvents,
} from "@sapphire/plugin-subcommands";

export class UserEvent extends Listener<
	typeof SubcommandPluginEvents.ChatInputSubcommandError
> {
	public async run(
		{ context, message: content }: UserError,
		{ interaction }: ChatInputSubcommandErrorPayload,
	) {
		if (Reflect.get(Object(context), "silent")) return;

		let message: string;

		switch (content) {
			case "fetch failed":
				message = "API down, you may try until it goes up? lol";
				break;

			default:
				message = content;
				break;
		}

		if (interaction.deferred || interaction.replied) {
			return interaction.editReply({
				content: message,
				allowedMentions: { users: [interaction.user.id], roles: [] },
			});
		}

		return interaction.reply({
			content: message,
			allowedMentions: { users: [interaction.user.id], roles: [] },
			ephemeral: true,
		});
	}
}
