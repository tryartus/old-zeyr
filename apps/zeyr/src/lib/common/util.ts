import { MessageEmbed } from "@biscuitland/helpers"
import { ZeyrContext } from "#lib/options";

export async function returnBufferResponse(ctx: ZeyrContext, time: string | null, data: ArrayBuffer) {
    return ctx.editOrReply(
        {
            content: "🖌️ done",
            embeds: [
                new MessageEmbed().setAuthor({
                    name: ctx.author.username,
                    iconUrl: ctx.author.avatarURL()
                })
                    .setFooter({
                        text: `${time}ms to complete`
                    })
                    .setImage("attachment://result.png")
                    .toJSON()
            ]
        },
        [
            {
                data: Buffer.from(data),
                name: "result.png",
            },
        ],
    );
}