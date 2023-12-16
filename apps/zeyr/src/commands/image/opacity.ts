import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	Declare,
	FailFunction,
	OKFunction,
	OnOptionsReturnObject,
	Options,
	SubCommand,
	createOption,
} from "@potoland/core";
import { objectEntries } from "@sapphire/utilities";
import { ZeyrContext, imageOptions } from "#lib/options";

export const imageOpacityOptions = {
	...imageOptions,
	opacity: createOption({
		description: "image opacity",
		required: true,
		type: ApplicationCommandOptionType.Number,
		value(value: number, ok: OKFunction<number>, fail: FailFunction) {
			if (value > 1 || value < 0)
				fail(Error("opacity value should be between 1 and 0"));
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
