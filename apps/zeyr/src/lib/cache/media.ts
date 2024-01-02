import { APIAttachment, LimitedCollection, Snowflake } from "@potoland/core";
import { minutes } from "#lib/common/time";

export const savedMedia = new LimitedCollection<Snowflake, APIAttachment>({
	expire: minutes(5),
});

export function getMediaOrUseOptions(channelId: Snowflake, callback?: string) {
	console.log(savedMedia.get(channelId));
	return savedMedia.get(channelId)?.proxy_url ?? callback;
}
