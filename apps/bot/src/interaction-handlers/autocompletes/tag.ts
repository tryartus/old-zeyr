import { ApplyOptions } from "@sapphire/decorators";
import {
	InteractionHandler,
	InteractionHandlerTypes,
} from "@sapphire/framework";
import type { AutocompleteInteraction } from "discord.js";
import { getTagsList } from "../../lib/database/tags";
import Fuse from "fuse.js";

@ApplyOptions<InteractionHandler.Options>({
  interactionHandlerType: InteractionHandlerTypes.Autocomplete
})
export class AutocompleteHandler extends InteractionHandler {
	public override async run(
		interaction: AutocompleteInteraction,
		result: InteractionHandler.ParseResult<this>,
	) {
		return interaction.respond(result);
	}

	public override async parse(interaction: AutocompleteInteraction) {
		if (
			interaction.commandName !== "tag" &&
			this.subcommands.includes(interaction.options.getSubcommand(true))
		)
			return this.none();

		const focusedOption = interaction.options.getFocused(true);

		switch (focusedOption.name) {
			case "name": {
				console.log(3);
				const tags = await getTagsList(interaction.guildId!);

				const fuse = new Fuse(tags, {
					keys: ["name", "content"],
				});

				const fuzzySearch =
					focusedOption.value.length >= 1
						? fuse
								.search(focusedOption.value)
								.map((entry) => ({ name: entry.item.name }))
						: tags;

				return this.some(
					fuzzySearch.map((entry) => ({
						name: entry.name,
						value: entry.name,
					})),
				);
			}
			default:
				return this.none();
		}
	}

	private readonly subcommands = ["show", "raw", "remove"];
}