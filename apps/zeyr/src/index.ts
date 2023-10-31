import { Result } from "@sapphire/framework";
import { ZeyrClient } from "./lib/classes/client";
import "./lib/setup";

const zeyr = new ZeyrClient();

const main = async () => {
	const login = await Result.fromAsync(
		async () => await zeyr.start(process.env.DISCORD_TOKEN),
	);

	return login.unwrapOrElse(() => {
		zeyr.panic();
	});
};

main();
