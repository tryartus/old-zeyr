import { Command, Declare, DynamicOptions } from "@potoland/core";

@Declare({
	name: "utils",
	description: "Util commands",
})
@DynamicOptions()
export default class UtilsGroup extends Command {}
