import { Subcommand } from "@kaname-png/plugin-subcommands-advanced";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry } from "@sapphire/framework";

@ApplyOptions<Subcommand.Options>({
	name: "tags",
})
export class ParentCommand extends Subcommand {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry,
	) {
		registry.registerChatInputCommand((ctx) => {
			this.hooks.subcommands(this, ctx);
			// this.hooks.group(this, ctx);

			return ctx
				.setName(this.name)
				.setDescription("Subcommands for tags commands");
		});
	}
}
