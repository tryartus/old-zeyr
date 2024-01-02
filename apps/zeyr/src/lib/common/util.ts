import { LimitedCollection, MessageEmbed } from "@potoland/core";
import { MushContext } from "#lib/options";
import { minutes } from "./time";

export const imageCache = new LimitedCollection({
	expire: minutes(10),
});

export async function returnBufferResponse(
	ctx: MushContext,
	time: string | null,
	data: ArrayBuffer,
) {
	return !time
		? ctx.editOrReply({
			content: "this did not work",
		})
		: ctx.editOrReply(
			{
				content: "🖌️ done",
				embeds: [
					new MessageEmbed()
						.setAuthor({
							name: ctx.author.username,
							iconUrl: ctx.author.avatarURL(),
						})
						.setFooter({
							text: `${time}ms to complete`,
						})
						.setImage("attachment://result.png"),
				],
			},
			[
				{
					data: Buffer.from(data),
					name: "result.png",
				},
			],
		);
}
