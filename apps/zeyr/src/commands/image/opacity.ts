import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	Declare,
	FailFunction,
	OKFunction,
	Options,
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
		value(value: number, ok: OKFunction<number>, fail: FailFunction) {
			if (value > 1 || value < 0)
				fail(Error("value should be between 1 and 0"));
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
	override async run(ctx: ZeyrContext<typeof imageOpacityOptions>) {
		const { data, time } = await ctx.api.opacity(
			ctx.options.url,
			ctx.options.opacity,
		);

		ctx.editOrReply(
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
