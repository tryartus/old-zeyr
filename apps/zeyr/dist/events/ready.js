"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@potoland/core");
exports.default = (0, core_1.createEvent)({
    data: {
        name: "ready",
        once: true,
    },
    run: (user, client) => client.logger.info(`${user.username} is ready!`),
});
