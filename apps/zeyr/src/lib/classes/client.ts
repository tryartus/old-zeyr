import { LogLevel, SapphireClient, container } from "@sapphire/framework";
import { greenBright } from "colorette";
import { type ClientOptions, GatewayIntentBits, Partials } from "discord.js";

const CLIENT_OPTIONS: ClientOptions = {
	defaultPrefix: "!!",
	regexPrefix: /^(hey +)?zeyr[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug,
	},
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
	loadMessageCommandListeners: true,
};

export class ZeyrClient extends SapphireClient {
	constructor() {
		super(CLIENT_OPTIONS);
	}

	public async start(token?: string) {
		container.logger.info(greenBright(""), "Connecting to Discord");
		await super.login(token);
		container.logger.info(
			greenBright("󰙯"),
			"Connected to %s",
			super.user?.username,
		);
	}

	public async panic() {
		container.logger.fatal(greenBright(""), "An error occurred, aborting...");
		await super.destroy();
		container.logger.fatal(greenBright(""), "Aborted.");
		process.exit(1);
	}
}
