import { Result } from "@sapphire/framework";
import { ZeyrClient } from "./lib/classes/client";
import "./lib/setup";

const zeyr = new ZeyrClient();

async function init() {
	const resultClient = await Result.fromAsync(
		async () => await zeyr.start(process.env.DISCORD_DEVELOPMENT_TOKEN),
	);

	return resultClient.unwrapOrElse((error) => {
		return zeyr.panic(error);
	});
}

init();
