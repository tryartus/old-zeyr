import { ApplyOptions } from "@sapphire/decorators";
import { Listener, Piece, Store } from "@sapphire/framework";
import { blueBright, greenBright } from "colorette";
import { ActivityType } from "discord.js";

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = greenBright;

	public override async run() {
		this.printBanner();
		this.printStoreDebugInformation();

		this.container.logger.info(
			greenBright("󰙯"),
			"Connected to",
			this.container.client.user?.username,
		);

		setInterval(
			async () =>
				await fetch("https://api.kanye.rest/")
					.then((x) => x.json())
					.then(({ quote }) =>
						this.container.client.user?.setPresence({
							activities: [
								{
									name: quote,
									type: ActivityType.Custom,
								},
								{
									name: "your data 🎅",
									type: ActivityType.Watching,
								},
							],
						}),
					),
			60000,
		);
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
