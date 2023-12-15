"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeyrAPI = void 0;
class ZeyrAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async invert(image_url) {
        const data = await this.post("/image/invert", {
            image_url
        });
        return {
            data: await data.arrayBuffer(),
            time: data.headers.get("X-Response-Time")
        };
    }
    async speechBalloon(image_url) {
        const data = await this.post("/image/speech-balloon", {
            image_url
        });
        return {
            data: await data.arrayBuffer(),
            time: data.headers.get("X-Response-Time")
        };
    }
    async opacity(image_url, image_opacity) {
        const data = await this.post("/image/opacity", {
            image_url,
            image_opacity
        });
        return {
            data: await data.arrayBuffer(),
            time: data.headers.get("X-Response-Time")
        };
    }
    async post(endpoint, headers) {
        return fetch(this.baseURL + endpoint, {
            headers: {
                ...headers
            },
            method: "POST"
        });
    }
}
exports.ZeyrAPI = ZeyrAPI;
