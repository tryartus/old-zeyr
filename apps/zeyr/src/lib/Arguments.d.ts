import { API } from "./classes/api";
import { Tags } from "./classes/tags";

declare module "@skyra/env-utilities" {
	interface Env {
		DISCORD_DEVELOPMENT_TOKEN: string;
		DISCORD_PRODUCTION_TOKEN: string;
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		api: API;
		tags: Tags;
		developers: string[];
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		Developer: never;
	}
}

export default undefined;
