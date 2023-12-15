import { Command, Declare, Options } from "@potoland/core";
import InvertCommand from "./invert";
import OpacityCommand from "./opacity";
import SpeechCommand from "./speech-balloon";

@Declare({
	name: "image",
	description: "Image commands",
})
@Options([InvertCommand, OpacityCommand, SpeechCommand])
export default class ImageGroup extends Command {}
