import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import { Collection, Message, TextChannel } from "discord.js";
import { lastImageCache } from "../../../lib/util/discord";

@ApplyOptions<Listener.Options>({})
export class UserEvent extends Listener<typeof Events.MessageCreate> {
	public override run(message: Message) {
		if (
			message.attachments.size > 0 &&
			message.channel instanceof TextChannel
		) {
			const channelID = message.channel.id;
			const messages: Collection<string, Message> =
				lastImageCache.get(channelID) || new Collection();

			messages.set(message.id, message);
			lastImageCache.set(channelID, messages);
		}
	}
}
