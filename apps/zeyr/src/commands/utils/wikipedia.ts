import {
	ApplicationCommandOptionType,
	Declare,
	MessageEmbed,
	OKFunction,
	Options,
	SubCommand,
	createOption,
} from "@potoland/core";
import { FetchResultTypes, fetch } from "@sapphire/fetch";
import { paginated } from "#lib/common/pagination";
import { ZeyrContext, queryOptions } from "#lib/options";

interface Wiki {
	title: string;
	extract: string;
	fullurl: string;
	thumbnail: {
		source: string;
	};
}

interface WikipediaResponse {
	query?: {
		pages: Wiki[];
	};
}

const wikipediaOptions = {
	...queryOptions,
	language: createOption({
		description: "language of the search (code only)",
		required: false,
		type: ApplicationCommandOptionType.String,
		value({ value }, ok: OKFunction<string>) {
			ok(value ?? "en");
		},
	}),
};

@Declare({
	name: "wikipedia",
	description: "searchs on wikipedia",
})
@Options(wikipediaOptions)
export default class Command extends SubCommand {
	async run(ctx: ZeyrContext<typeof wikipediaOptions>) {
		await ctx.interaction.deferReply();

		const { query } = await fetch<WikipediaResponse>(
			`https://${
				ctx.options.language
			}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=5&formatversion=2&titles=${encodeURIComponent(
				ctx.options.query,
			)}`,
			FetchResultTypes.JSON,
		);

		if (query?.pages) {
			const baseEmbed = new MessageEmbed()
				.setColor(0x08b7fc)
				.setThumbnail("https://imgur.com/K33Gx4b.png");
			if (query.pages.length === 1) {
				const page = query.pages[0] as Wiki;
				return ctx.editOrReply({
					embeds: [
						baseEmbed
							.setTitle(page.title)
							.setImage(page.thumbnail.source)
							.setDescription(page.extract)
							.toJSON(),
					],
				});
			}

			const pages = query.pages.map((w) =>
				baseEmbed
					.setTitle(w.title)
					.setImage(w.thumbnail.source)
					.setDescription(w.extract),
			);

			return ctx.editOrReply(paginated(0, pages));
		}

		return ctx.editOrReply({
			content: "no entries found",
		});
	}
}
