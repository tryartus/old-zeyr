import { Declare, Options, SubCommand } from "@potoland/core";
import { returnBufferResponse } from "#lib/common/util";
import { ZeyrContext, imageOptions } from "#lib/options";

@Declare({
	name: "speech-balloon",
	description: "make fun of someone lol",
})
@Options(imageOptions)
export default class Command extends SubCommand {
	async run(ctx: ZeyrContext<typeof imageOptions>) {
		const { data, time } = await ctx.api.speechBalloon(ctx.options.url);

		return await returnBufferResponse(ctx, time, data)
	}
}
