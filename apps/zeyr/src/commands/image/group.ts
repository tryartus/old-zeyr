import {
	Command,
	Declare,
	DynamicOptions,
	Middlewares,
	OnOptionsReturnObject,
} from "@potoland/core";
import { objectEntries } from "@sapphire/utilities";
import ratelimit from "#lib/middlewares/ratelimit";
import { ZeyrContext } from "#lib/options";

@Declare({
	name: "image",
	description: "Image commands",
})
@DynamicOptions()
@Middlewares([ratelimit])
export default class ImageGroup extends Command {
	override onMiddlewaresError(context: ZeyrContext, error: Error) {
		console.log("middleware", error);
		context.editOrReply({
			content: error.message,
		});
	}

	override onRunError(context: ZeyrContext, error: unknown) {
		console.log(error);
		context.editOrReply({
			content: "image generation had an error while executing the command",
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
