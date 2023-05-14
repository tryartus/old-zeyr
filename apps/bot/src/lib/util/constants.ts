import { LogLevel } from "@sapphire/framework";
import { type InternationalizationContext } from "@sapphire/plugin-i18next";
import {
	GatewayIntentBits,
	type ClientOptions,
	ActivityType,
	PresenceUpdateStatus,
} from "discord.js";
import { join } from "path";
import { getOrCreateGuild } from "../database/guilds";
import {
	BreakParser,
	DefineParser,
	FiftyFiftyParser,
	IfStatementParser,
	IncludesParser,
	JSONVarParser,
	LooseVarsParser,
	OrdinalFormatParser,
	RandomParser,
	RangeParser,
	ReplaceParser,
	SliceParser,
	StrictVarsParser,
} from "tagscript";
import {
	EmbedParser,
	FilesParser,
	DeleteParser,
} from "tagscript-plugin-discord";
import {
	FetchParser,
	ImagescriptParser,
	NSFWParser,
	OCRParser,
} from "./parsers";
export const rootDir = join(__dirname, "..", "..");
export const srcDir = join(rootDir, "src");

export const tagParsers = [
	new BreakParser(),
	new DefineParser(),
	new FiftyFiftyParser(),
	new IfStatementParser(),
	new IncludesParser(),
	new JSONVarParser(),
	new LooseVarsParser(),
	new OrdinalFormatParser(),
	new RandomParser(),
	new RangeParser(),
	new ReplaceParser(),
	new SliceParser(),
	new StrictVarsParser(),

	// Discord parsers
	new EmbedParser(),
	new FilesParser(),
	new DeleteParser(),
	new NSFWParser(),

	// Custom parsers
	new OCRParser(),
	new FetchParser(),
	new ImagescriptParser(),
];

export const languages = [
	{
		name: "English",
		value: "en-US",
	},
	{
		name: "Spanish",
		value: "es-ES",
	},
];

export const CLIENT_OPTIONS: ClientOptions = {
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug,
	},
	intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
	loadMessageCommandListeners: false, // Zeyr won't listen to any 'message' events, stay safe.
	loadDefaultErrorListeners: true,
	loadSubcommandErrorListeners: true,
	presence: {
		activities: [
			{
				name: "my repo",
				type: ActivityType.Watching,
			},
		],
		status: PresenceUpdateStatus.Online,
		afk: false,
	},
	subcommandsAdvanced: {
		nameCommandsAutogenerated: true,
	},
	i18n: {
		fetchLanguage: async (context: InternationalizationContext) => {
			if (!context.guild) return "en-US";

			const guild = await getOrCreateGuild(context.guild.id);

			if (!guild) return "en-US";

			return guild.language;
		},
		i18next: {
			fallbackLng: "en-US",
			interpolation: {
				defaultVariables: {
					error: "🤕",
					ok: "😊",
					info: "🧐",
				},
			},
		},
	},
};
