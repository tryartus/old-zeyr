import { Command, CommandContext, Declare } from "@potoland/core";

@Declare({
	name: "ping",
	description: "Gets the bot latency between discord and the.",
})
export default class PingCommand extends Command {
	override async run(ctx: CommandContext<true, {}>) {
		await ctx.interaction.deferReply();
		return ctx.editResponse({
			content: `Pong! \`${await this.getLatency(ctx)}ms\`.`,
		});
	}

	private async getLatency(ctx: CommandContext<true, {}>): Promise<number> {
		const start = Date.now();
		await ctx.client.rest.get("/users/@me");
		const end = Date.now();

		return end - start;
	}
}
