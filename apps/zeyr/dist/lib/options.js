"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageOptions = exports.ZeyrContext = void 0;
const common_1 = require("@biscuitland/common");
const core_1 = require("@potoland/core");
const api_1 = require("./api");
class ZeyrContext extends core_1.CommandContext {
    constructor() {
        super(...arguments);
        this.api = new api_1.ZeyrAPI("http://127.0.0.1:3000");
    }
}
exports.ZeyrContext = ZeyrContext;
exports.imageOptions = {
    url: (0, core_1.createOption)({
        description: "image url",
        required: true,
        type: common_1.ApplicationCommandOptionType.String,
        value(value, ok, fail) {
            if (!value.startsWith("https://") || !value.endsWith(".png"))
                fail(Error("you must enter a valid image url"));
            ok(value);
        },
    }),
};
