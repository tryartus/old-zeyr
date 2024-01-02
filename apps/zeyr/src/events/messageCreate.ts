import { APIAttachment, createEvent } from "@potoland/core";
import { savedMedia } from "#lib/cache/media";

export default createEvent({
    data: {
        name: "messageCreate"
    },
    run: (message) => {
        console.log(message)
        if (message.attachments.length) {
            savedMedia.set(message.channelId, message.attachments[0] as unknown as APIAttachment)
        }
    },
});
