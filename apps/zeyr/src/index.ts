import { ZeyrClient } from "#lib/client";
import { ZeyrContext } from "#lib/options";
import "#lib/setup";

const client = new ZeyrClient({
	context: ZeyrContext
});

void client.run();
