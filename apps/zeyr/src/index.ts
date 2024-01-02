import { MushClient } from "#lib/client";
import { MushContext } from "#lib/options";
import "#lib/setup";

const client = new MushClient({
	context: MushContext,
});

void client.run();
