import { PotoClient } from "@potoland/core";

export class ZeyrClient extends PotoClient {
	public async run(): Promise<boolean> {
		await this.start();
		await this.execute();
		await this.uploadCommands(process.env.APPLICATION_ID);

		return true;
	}
}