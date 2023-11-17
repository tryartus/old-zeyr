import { API } from "./classes/api";

declare module "@skyra/env-utilities" {
	interface Env {
		DISCORD_DEVELOPMENT_TOKEN: string;
		DISCORD_PRODUCTION_TOKEN: string;
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		api: API;
	}
}

export default undefined;
