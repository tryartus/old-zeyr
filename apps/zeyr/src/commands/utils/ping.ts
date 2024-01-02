import { Declare, SubCommand } from "@potoland/core";
import { MushContext } from "#lib/options";

@Declare({
	name: "ping",
	description: "gets the bot latency",
})
export default class Command extends SubCommand {
	async run(ctx: MushContext) {
		await ctx.interaction.deferReply();
		const apiPing = await this.getAPILatency(ctx);

		return ctx.editResponse({
			content: `🌏 Discord latency: ${await this.getDiscordLatency(ctx)}ms${apiPing !== 0 ? `\n📡 Mush API latency: ${apiPing}ms` : ""
				}`,
		});
	}

	private async getDiscordLatency(ctx: MushContext): Promise<number> {
		const start = Date.now();
		await ctx.client.rest.get("/users/@me");
		const end = Date.now();

		return end - start;
	}

	private async getAPILatency(ctx: MushContext): Promise<number | boolean> {
		const start = Date.now();
		const online = await ctx.api.ping().catch(() => 0);
		const end = Date.now();

		return online ? end - start : 0;
	}
}
