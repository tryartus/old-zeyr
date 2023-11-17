import { Collection, GuildTextBasedChannel, Message } from "discord.js";

export const lastImageCache: Map<
	string,
	Collection<string, Message>
> = new Map();

export function getLastImage(
	channel: GuildTextBasedChannel,
): Promise<string | undefined> {
	return new Promise((resolve) => {
		const messages: Collection<string, Message> =
			lastImageCache.get(channel.id) || new Collection();
		const lastImage = messages.find((msg) => msg.attachments.size > 0);

		if (lastImage) {
			resolve(lastImage.attachments.first()?.url);
		} else {
			channel.messages.fetch({ limit: 40 }).then((fetchedMessages) => {
				lastImageCache.set(channel.id, fetchedMessages);
				const imgMsg = fetchedMessages.find((msg) => msg.attachments.size > 0);
				resolve(imgMsg?.attachments.first()?.url);
			});
		}
	});
}
