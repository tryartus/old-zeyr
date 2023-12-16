import { createMiddleware } from "@potoland/core";
import { RateLimitManager } from "@sapphire/ratelimits";
import { seconds } from "#lib/common/time";

const rateLimitManager = new RateLimitManager(3000);

export default createMiddleware<void>(async (middleware) => {
    const ratelimit = rateLimitManager.acquire("global");

    if (ratelimit.limited) {
        return middleware.stop(
            Error(
                `you are being ratelimited, please wait ${seconds.fromMilliseconds(
                    ratelimit.remainingTime,
                )}s until you can run this command again`,
            ),
        );
    }

    ratelimit.consume();
    return middleware.next();
});
