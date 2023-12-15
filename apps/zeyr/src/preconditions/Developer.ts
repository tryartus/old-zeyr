import { Precondition } from "@sapphire/framework";
import type { ChatInputCommandInteraction } from "discord.js";

export class UserPrecondition extends Precondition {
	public override messageRun() {
		return this.ok();
	}

	public override chatInputRun(interaction: ChatInputCommandInteraction) {
		return this.checkHierarchy(interaction);
	}

	private checkHierarchy(interaction: ChatInputCommandInteraction) {
		if (this.container.developers.includes(interaction.user.id))
			return this.ok();
		return this.error({
			message: "you are not allowed to run this command",
		});
	}
}
