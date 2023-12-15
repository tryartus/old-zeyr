import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import { GuildMember } from "discord.js";

@ApplyOptions<Listener.Options>({
	name: Events.GuildMemberAdd,
})
export class UserEvent extends Listener<typeof Events.GuildMemberAdd> {
	public override async run(member: GuildMember) {
		// prime stuff on official server
		const user = await this.container.utilities.db.getUser(member.id);

		if (member.guild.id === this.SUPPORT_SERVER) {
			if (user?.primeStatus) {
				member.roles.add(this.PRIME_ROLE);
			}
		}
	}

	private SUPPORT_SERVER = "1167144815583043634";
	private PRIME_ROLE = "1175126775337066546";
}
