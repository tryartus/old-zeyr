import { createEvent } from "@potoland/core";

export default createEvent({
	data: {
		name: "ready",
		once: true,
	},
	run: (user, client) => client.logger.info(`${user.username} is ready!`),
});
