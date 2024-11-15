"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsBridgeExtOffscreen_1 = require("../JsBridgeExtOffscreen");
function createOffscreenJsBridge(config) {
    const bridge = new JsBridgeExtOffscreen_1.JsBridgeExtOffscreen(config);
    return bridge;
}
exports.default = {
    createOffscreenJsBridge,
};
