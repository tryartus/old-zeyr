import { PotoClient } from "@potoland/core";

export class MushClient extends PotoClient {
	public async run(): Promise<boolean> {
		await this.start();
		await this.execute({
			intents: 33283,
		});
		await this.uploadCommands(process.env.APPLICATION_ID);

		return true;
	}
}
