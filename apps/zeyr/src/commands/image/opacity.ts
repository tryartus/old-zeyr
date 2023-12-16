import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	Declare,
	OKFunction,
	Options,
	StopFunction,
	SubCommand,
	createOption,
} from "@potoland/core";
import { ZeyrContext, imageOptions } from "#lib/options";

export const imageOpacityOptions = {
	...imageOptions,
	opacity: createOption({
		description: "image opacity",
		required: true,
		type: ApplicationCommandOptionType.Number,
		value(value: number, ok: OKFunction<number>, stop: StopFunction) {
			if (value > 1 || value < 0)
				stop(Error("opacity value should be between 1 and 0"));
			ok(value);
		},
	}),
};

@Declare({
	name: "opacity",
	description: "changes an image opacity",
})
@Options(imageOpacityOptions)
export default class OpacityCommand extends SubCommand {
	async run(ctx: ZeyrContext<typeof imageOpacityOptions>) {
		const { data, time } = await ctx.api.opacity(
			ctx.options.url,
			ctx.options.opacity.toString(),
		);

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
