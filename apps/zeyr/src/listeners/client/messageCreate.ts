import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<Listener.Options>({})
export class UserEvent extends Listener<typeof Events.MessageCreate> {
	public override run(message: Message) {
		console.log(message);
	}
}
