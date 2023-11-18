import {
	Command,
	RegisterSubCommand,
} from "@kaname-png/plugin-subcommands-advanced";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { FetchResultTypes, fetch as sfetch } from "@sapphire/fetch";
import { objectEntries } from "@sapphire/utilities";
import { Colors, EmbedBuilder } from "discord.js";

export interface InvidiousVideo {
	type: string;
	title: string;
	videoId: string;
	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;
	videoThumbnails: InvidiousVideoThumbnail[];
	description: string;
	descriptionHtml: string;
	viewCount: number;
	viewCountText: string;
	published: number;
	publishedText: string;
	lengthSeconds: number;
	liveNow: boolean;
	premium: boolean;
	isUpcoming: boolean;
}

export interface InvidiousVideoThumbnail {
	quality: string;
	url: string;
	width: number;
	height: number;
}

@RegisterSubCommand("util", (builder) =>
	builder
		.setName("invidious")
		.setDescription("search trough youtube videos (invidious instance)")
		.addStringOption((option) =>
			option.setName("query").setDescription("search query").setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("locale")
				.setDescription("search locale")
				.setRequired(false),
		)
		.addStringOption((option) =>
			option
				.setName("features")
				.setDescription(
					"hd, subtitles, creative_commons, 3d, live, purchased, 4k, 360, location, hdr, vr180",
				)
				.setRequired(false),
		)
		.addStringOption((option) =>
			option
				.setName("sort")
				.setDescription("search sorting")
				.addChoices(
					{
						name: "Relevance",
						value: "relevance",
					},
					{
						name: "Rating",
						value: "rating",
					},
					{
						name: "Upload date",
						value: "upload_date",
					},
					{
						name: "View count",
						value: "view_count",
					},
				)
				.setRequired(false),
		),
)
export class UserCommand extends Command {
	public override async chatInputRun(
		interaction: Command.ChatInputInteraction<"cached">,
	) {
		const query = interaction.options.getString("query", true);
		const locale = interaction.options.getString("locale", false);
		const features = interaction.options.getString("features", false);
		const sort = interaction.options.getString("sort", false);

		const paginate = new PaginatedMessage({
			template: new EmbedBuilder().setColor(Colors.Blurple),
		});

		const searchQueries = {
			q: query,
			hl: locale ?? "en",
			type: "video",
			features,
			sort,
		};
		const searchURL = new URL(`${this.API_URL}/search`);

		objectEntries(searchQueries).map(([q, v]) =>
			searchURL.searchParams.append(q, v ?? ""),
		);

		const results = await sfetch<InvidiousVideo[]>(
			searchURL.toString(),
			FetchResultTypes.JSON,
		);

		for (const video of results) {
			paginate.addPageEmbed((embed) =>
				embed
					.setTitle(video.title)
					.setImage(this.formatThumbnail(video.videoId))
					.setFooter({
						text: ` ${video.publishedText}`,
					}),
			);
		}

		return await paginate.run(interaction);
	}

	private formatThumbnail(videoId: string) {
		return `https://i.ytimg.com/vi/${videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAwQtNN8WQdPgf83eOv-xxCrdbRBg`;
	}

	private readonly API_URL = "https://invidious.fdn.fr/api/v1";
}
