import { Declare, Options, SubCommand } from "@potoland/core";
import { isNullOrUndefinedOrEmpty } from "@sapphire/utilities";
import { getMediaOrUseOptions } from "#lib/cache/media";
import { returnBufferResponse } from "#lib/common/util";
import { ZeyrContext, imageOptions } from "#lib/options";

@Declare({
	name: "speech-balloon",
	description: "make fun of someone lol",
})
@Options(imageOptions)
export default class Command extends SubCommand {
	async run(ctx: ZeyrContext<typeof imageOptions>) {
		const url = getMediaOrUseOptions(ctx.interaction.channelId!, ctx.options.attachment?.proxy_url ?? ctx.options.url)

		if (isNullOrUndefinedOrEmpty(url)) return ctx.editOrReply({
			content: "no valid media passed"
		})

		const { data, time } = await ctx.api.speechBalloon(url);

		return await returnBufferResponse(ctx, time, data);
	}
}
