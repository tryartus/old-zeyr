import { Declare, Options, SubCommand } from "@potoland/core";
import { ZeyrContext, imageOptions } from "#lib/options";

@Declare({
	name: "speech-balloon",
	description: "make fun of someone lol",
})
@Options(imageOptions)
export default class SpeechCommand extends SubCommand {
	async run(ctx: ZeyrContext<typeof imageOptions>) {
		const { data, time } = await ctx.api.speechBalloon(ctx.options.url);

		await ctx.editOrReply(
			{
				content: `took ${time}ms`,
			},
			[
				{
					data: Buffer.from(data),
					name: "result.png",
				},
			],
		);
	}
}
