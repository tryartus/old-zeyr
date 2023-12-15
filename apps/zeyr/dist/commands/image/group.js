"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@potoland/core");
const invert_1 = __importDefault(require("./invert"));
const opacity_1 = __importDefault(require("./opacity"));
const speech_balloon_1 = __importDefault(require("./speech-balloon"));
let ImageGroup = class ImageGroup extends core_1.Command {
};
ImageGroup = __decorate([
    (0, core_1.Declare)({
        name: "image",
        description: "Image commands",
    }),
    (0, core_1.Options)([invert_1.default, opacity_1.default, speech_balloon_1.default])
], ImageGroup);
exports.default = ImageGroup;
