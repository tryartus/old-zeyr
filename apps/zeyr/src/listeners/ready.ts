import { ApplyOptions } from "@sapphire/decorators";
import { Listener, Piece, Store } from "@sapphire/framework";
import { blueBright, greenBright } from "colorette";
import { ActivityType } from "discord.js";

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = greenBright;

	public override run() {
		this.printBanner();
		this.printStoreDebugInformation();

		this.container.logger.info(
			greenBright("󰙯"),
			"Connected to",
			this.container.client.user?.username,
		);

		this.container.client.user?.setPresence({
			activities: [
				{
					name: "your server 👁️",
					type: ActivityType.Watching,
				},
			],
		});
	}

	private printBanner() {
		this.container.logger.debug("Welcome to Zeyr :)");
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store));
		logger.info(this.styleStore(last));
	}

	private styleStore(store: Store<Piece>) {
		return blueBright(`🎉 Loaded ${this.style(store.size)} ${store.name}.`);
	}
}
