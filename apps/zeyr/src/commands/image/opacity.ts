import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	Declare,
	OKFunction,
	Options,
	StopFunction,
	SubCommand,
	createOption,
} from "@potoland/core";
import { isNullOrUndefinedOrEmpty } from "@sapphire/utilities";
import { getMediaOrUseOptions } from "#lib/cache/media";
import { returnBufferResponse } from "#lib/common/util";
import { MushContext, imageOptions } from "#lib/options";

export const imageOpacityOptions = {
	opacity: createOption({
		description: "image opacity",
		required: true,
		type: ApplicationCommandOptionType.Number,
		value({ value }, ok: OKFunction<number>, stop: StopFunction) {
			if (value > 1 || value < 0)
				stop(Error("opacity value should be between 1 and 0"));
			ok(value);
		},
	}),
	...imageOptions,
};

@Declare({
	name: "opacity",
	description: "changes an image opacity",
})
@Options(imageOpacityOptions)
export default class Command extends SubCommand {
	async run(ctx: MushContext<typeof imageOpacityOptions>) {
		const url = getMediaOrUseOptions(
			ctx.interaction.channelId!,
			ctx.options.attachment?.proxy_url ?? ctx.options.url,
		);

		if (isNullOrUndefinedOrEmpty(url))
			return ctx.editOrReply({
				content: "no valid media passed",
			});

		const { data, time } = await ctx.api.opacity(
			url,
			ctx.options.opacity.toString(),
		);

		return await returnBufferResponse(ctx, time, data);
	}
}
