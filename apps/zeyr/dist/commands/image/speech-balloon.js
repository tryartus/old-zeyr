"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@potoland/core");
const options_1 = require("#lib/options");
let SpeechCommand = class SpeechCommand extends core_1.SubCommand {
    async run(ctx) {
        const { data, time } = await ctx.api.speechBalloon(ctx.options.url);
        await ctx.editOrReply({
            content: `took ${time}ms`
        }, [
            {
                data: Buffer.from(data),
                name: "result.png"
            }
        ]);
    }
    onOptionsError(context, error) {
        console.error(error);
        context.editOrReply({
            content: "command threw an error"
        });
    }
};
SpeechCommand = __decorate([
    (0, core_1.Declare)({
        name: "speech-balloon",
        description: "make fun of someone lol",
    }),
    (0, core_1.Options)(options_1.imageOptions)
], SpeechCommand);
exports.default = SpeechCommand;
