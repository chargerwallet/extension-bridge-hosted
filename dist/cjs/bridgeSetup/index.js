"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeSetup = void 0;
const background_1 = __importDefault(require("./background"));
const ui_1 = __importDefault(require("./ui"));
const contentScript_1 = __importDefault(require("./contentScript"));
const offscreen_1 = __importDefault(require("./offscreen"));
exports.bridgeSetup = {
    contentScript: contentScript_1.default,
    ui: ui_1.default,
    background: background_1.default,
    offscreen: offscreen_1.default,
};
