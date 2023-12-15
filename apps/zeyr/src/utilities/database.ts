import { ApplyOptions } from "@sapphire/decorators";
import { Utility } from "@sapphire/plugin-utilities-store";
import { Snowflake } from "discord.js";

@ApplyOptions<Utility.Options>({})
export class DatabaseUtility extends Utility {
	public async getUser(userId: Snowflake) {
		return await this.container.prisma.user
			.findUniqueOrThrow({
				where: {
					id: userId,
				},
			})
			.catch(
				async () =>
					await this.container.prisma.user.create({
						data: {
							id: userId,
						},
					}),
			);
	}
}
