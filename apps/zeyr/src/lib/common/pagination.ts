import { APIInteractionResponseCallbackData, ActionRow, Button, ButtonStyle, MessageEmbed } from "@potoland/core";

export function paginated(index: number, embeds: MessageEmbed[], baseEmbed = new MessageEmbed()) {
    const page = new MessageEmbed({ ...embeds.at(index ?? 0)?.toJSON(), ...baseEmbed.toJSON() })

    page.setFooter({
        text: `${index}/${embeds.length} | ${page.data.footer?.text ?? ""}`
    })

    const row: ActionRow<Button> = new ActionRow<Button>().addComponents(
        new Button().setCustomId("prev").setStyle(ButtonStyle.Primary).setEmoji("◀️").run((interaction) => interaction.update(paginated(index - 1, embeds, baseEmbed))),
        new Button().setCustomId("next").setStyle(ButtonStyle.Primary).setEmoji("▶️").run((interaction) => interaction.update(paginated(index + 1, embeds, baseEmbed))),
        new Button().setCustomId("del").setStyle(ButtonStyle.Danger).setEmoji("🗑️").run((_, stop) => stop())
    )

    return { embeds: [page], components: [embeds.length === 0 ? undefined : row] } as Omit<APIInteractionResponseCallbackData, "components" | "embeds">
}