import { ApplicationCommandOptionType } from "@biscuitland/common";
import {
	CommandContext,
	MiddlewareContext,
	OKFunction,
	OptionsRecord,
	StopFunction,
	createOption,
	extendContext,
} from "@potoland/core";
import { ZeyrAPI } from "./api";

export const ZeyrContext = extendContext(() => {
	return { api: new ZeyrAPI("http://127.0.0.1:3000") };
});

export type ZeyrContext<
	O extends OptionsRecord = {},
	M extends readonly MiddlewareContext[] = [],
> = CommandContext<"client", O, M> & {
	api: ZeyrAPI;
};

const imageRegex = /(http[s]?:\/\/.*\.(?:png|jpg|jpeg|webp|avif))/i;

export const imageOptions = {
	url: createOption({
		description: "image url",
		required: true,
		type: ApplicationCommandOptionType.String,
		value({ value }, ok: OKFunction<string>, stop: StopFunction) {
			if (!imageRegex.test(value))
				stop(Error("you must enter a valid image url"));
			ok(value);
		},
	}),
};
