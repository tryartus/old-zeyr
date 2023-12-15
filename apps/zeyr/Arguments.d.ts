import { PrismaClient } from "@prisma/client";
import { API } from "./src/lib/classes/api";
import { Tags } from "./src/lib/classes/tags";
import { DatabaseUtility } from "./src/utilities/database";

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
		prisma: PrismaClient;
		developers: string[];
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		Developer: never;
		Prime: never;
	}
}

declare module "@sapphire/plugin-utilities-store" {
	export interface Utilities {
		db: DatabaseUtility;
	}
}

export default undefined;
