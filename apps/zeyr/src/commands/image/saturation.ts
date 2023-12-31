import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	Declare,
	OKFunction,
	Options,
	StopFunction,
	SubCommand,
	createOption,
} from "@potoland/core";
import { returnBufferResponse } from "#lib/common/util";
import { ZeyrContext, imageOptions } from "#lib/options";

export const imageSaturationOptions = {
	...imageOptions,
	saturation: createOption({
		description: "image saturation",
		required: true,
		type: ApplicationCommandOptionType.Number,
		value({ value }, ok: OKFunction<number>, stop: StopFunction) {
			if (value > 1 || value < 0)
				stop(Error("saturation value should be between 1 and 0"));
			ok(value);
		},
	}),
};

@Declare({
	name: "saturation",
	description: "changes an image saturation",
})
@Options(imageSaturationOptions)
export default class Command extends SubCommand {
	async run(ctx: ZeyrContext<typeof imageSaturationOptions>) {
		const { data, time } = await ctx.api.saturation(
			ctx.options.url,
			ctx.options.saturation.toString(),
		);

		return await returnBufferResponse(ctx, time, data);
	}
}
