import { Command, Declare, OnOptionsReturnObject, Options } from "@potoland/core";
import { objectEntries } from "@sapphire/utilities";
import { ZeyrContext } from "#lib/options";
import InvertCommand from "./invert";
import OpacityCommand from "./opacity";
import SpeechCommand from "./speech-balloon";

@Declare({
	name: "image",
	description: "Image commands",
})
@Options([InvertCommand, OpacityCommand, SpeechCommand])
export default class ImageGroup extends Command {
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
