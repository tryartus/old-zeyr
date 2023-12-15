import { Precondition } from "@sapphire/framework";
import type { ChatInputCommandInteraction } from "discord.js";

export class UserPrecondition extends Precondition {
	public override messageRun() {
		return this.ok();
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		return await this.checkprime(interaction);
	}

	private async checkprime(interaction: ChatInputCommandInteraction) {
		const user = await this.container.utilities.db.getUser(interaction.user.id);

		if (user?.primeStatus) return this.ok();
		return this.error({
			message:
				"you need prime status to run this command, consider supporting zeyr by upgrading your account!",
		});
	}
}
