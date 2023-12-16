import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	CommandContext,
	FailFunction,
	MiddlewareContext,
	OKFunction,
	OptionsRecord,
	createOption,
} from "@potoland/core";
import { ZeyrAPI } from "./api";

export class ZeyrContext<
	T extends OptionsRecord = {},
	M extends readonly MiddlewareContext[] = [],
> extends CommandContext<true, T, M> {
	api = new ZeyrAPI("http://127.0.0.1:3000");
}

const imageRegex = /(http[s]?:\/\/.*\.(?:png|jpg|jpeg))/i;

export const imageOptions = {
	url: createOption({
		description: "image url",
		required: true,
		type: ApplicationCommandOptionType.String,
		value(value: string, ok: OKFunction<string>, fail: FailFunction) {
			if (!imageRegex.test(value))
				fail(Error("you must enter a valid image url"));
			ok(value);
		},
	}),
};