"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("#lib/client");
const options_1 = require("#lib/options");
require("#lib/setup");
const client = new client_1.ZeyrClient({
    context: options_1.ZeyrContext
});
void client.run();
