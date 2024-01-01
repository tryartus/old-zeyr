import { Declare, MessageEmbed, Options, SubCommand } from "@potoland/core";
import { BaseClient } from "@potoland/core/dist/client/base";
import { FetchResultTypes, fetch } from "@sapphire/fetch"
import { paginated } from "#lib/common/pagination";
import { ZeyrContext, queryOptions } from "#lib/options";

interface UrbanDictionaryResultOk {
    list: UrbanDictionaryResultOkEntry[];
}

interface UrbanDictionaryResultOkEntry {
    definition: string;
    permalink: string;
    thumbs_up: number;
    sound_urls: unknown[];
    author: string;
    word: string;
    defid: number;
    current_vote: string;
    written_on: Date;
    example: string;
    thumbs_down: number;
}

@Declare({
    name: "urban",
    description: "searchs on urbandictionary",
})
@Options(queryOptions)
export default class Command extends SubCommand {
    override onRunError(context: ZeyrContext, error: unknown) {
        console.log(context, error)
    }

    override onInternalError(_: BaseClient, error?: unknown) {
        console.log(error)
    }

    async run(ctx: ZeyrContext<typeof queryOptions>) {
        await ctx.interaction.deferReply();

        const query = await fetch<UrbanDictionaryResultOk>(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(ctx.options.query)}`, FetchResultTypes.JSON);
        const list = query.list.sort((a, b) => b.thumbs_up - b.thumbs_down - (a.thumbs_up - a.thumbs_down));

        if (list) {
            const pages = list.map((w) => new MessageEmbed()
                .setTitle(w.word)
                .setDescription(`${w.definition}\n\n${w.example}`)
                .setFooter({
                    text: w.author
                })
                .addFields(
                    {
                        name: "Thumbs up",
                        value: w.thumbs_up.toString()
                    }
                )
            )

            return ctx.editOrReply(paginated(0, pages, new MessageEmbed()
                .setColor(0x08B7FC)
                .setThumbnail("https://imgur.com/CcIZZsa.png")))
        }

        return ctx.editOrReply({
            content: "no entries found"
        })
    }
}
