import { Command, Declare, Options } from "@potoland/core";
import PingCommand from "./ping";

@Declare({
    name: "utils",
    description: "Util commands",
})
@Options([PingCommand])
export default class UtilsGroup extends Command { }
