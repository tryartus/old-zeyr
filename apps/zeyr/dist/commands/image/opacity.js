"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageOpacityOptions = void 0;
const common_1 = require("@biscuitland/common");
const core_1 = require("@potoland/core");
const options_1 = require("#lib/options");
exports.imageOpacityOptions = {
    ...options_1.imageOptions,
    opacity: (0, core_1.createOption)({
        description: "image opacity",
        required: true,
        type: common_1.ApplicationCommandOptionType.Number,
        value(value, ok, fail) {
            if (value > 1 || value < 0)
                fail(Error("value should be between 1 and 0"));
            ok(value);
        },
    }),
};
let OpacityCommand = class OpacityCommand extends core_1.SubCommand {
    async run(ctx) {
        const { data, time } = await ctx.api.opacity(ctx.options.url, ctx.options.opacity);
        ctx.editOrReply({
            content: `took ${time}ms`
        }, [
            {
                data: Buffer.from(data),
                name: "result.png"
            }
        ]);
    }
};
OpacityCommand = __decorate([
    (0, core_1.Declare)({
        name: "opacity",
        description: "changes an image opacity",
    }),
    (0, core_1.Options)(exports.imageOpacityOptions)
], OpacityCommand);
exports.default = OpacityCommand;
