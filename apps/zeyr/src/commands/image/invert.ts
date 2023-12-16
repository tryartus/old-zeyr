import { Declare, Options, SubCommand } from "@potoland/core";
import { ZeyrContext, imageOptions } from "#lib/options";

@Declare({
	name: "invert",
	description: "inverts an image colors",
})
@Options(imageOptions)
export default class InvertCommand extends SubCommand {
	async run(ctx: ZeyrContext<typeof imageOptions>) {
		const { data, time } = await ctx.api.invert(ctx.options.url);

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
