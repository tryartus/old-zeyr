"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeyrClient = void 0;
const core_1 = require("@potoland/core");
class ZeyrClient extends core_1.PotoClient {
    async run() {
        await this.start();
        await this.execute();
        await this.uploadCommands(process.env.APPLICATION_ID);
        return true;
    }
}
exports.ZeyrClient = ZeyrClient;
