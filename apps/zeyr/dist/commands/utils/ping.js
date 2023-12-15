"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@potoland/core");
let PingCommand = class PingCommand extends core_1.SubCommand {
    async run(ctx) {
        await ctx.interaction.deferReply();
        return ctx.editResponse({
            content: `Pong! \`${await this.getLatency(ctx)}ms\`.`,
        });
    }
    async getLatency(ctx) {
        const start = Date.now();
        await ctx.client.rest.get("/users/@me");
        const end = Date.now();
        return end - start;
    }
};
PingCommand = __decorate([
    (0, core_1.Declare)({
        name: "ping",
        description: "Gets the bot latency between discord and the.",
    })
], PingCommand);
exports.default = PingCommand;
