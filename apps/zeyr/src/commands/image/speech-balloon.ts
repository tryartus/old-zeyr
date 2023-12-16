import {
	Declare,
	OnOptionsReturnObject,
	Options,
	SubCommand,
} from "@potoland/core";
import { objectEntries } from "@sapphire/utilities";
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

	override onRunError(context: ZeyrContext, error: unknown) {
		console.log(error);
		context.editOrReply({
			content: "an unknown error has occurred",
		});
	}

	override onOptionsError(context: ZeyrContext, error: OnOptionsReturnObject) {
		context.editOrReply({
			content: objectEntries(error)
				.filter(([_, b]) => b.failed === true)
				.map(([_, err]) => err.value)
				.join("\n"),
		});
	}
}
