import { createEvent } from "@potoland/core";

export default createEvent({
	data: {
		name: "ready",
		once: true,
	},
	run: (_, client) => {
		client.logger.info("Zeyr is ready");
	},
});
