import { AutoLoad, Command, Declare } from "@potoland/core";

@Declare({
	name: "utils",
	description: "Util commands",
})
@AutoLoad()
export default class Group extends Command {}
