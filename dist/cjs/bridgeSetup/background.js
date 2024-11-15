"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsBridgeExtBackground_1 = require("../JsBridgeExtBackground");
function createHostBridge({ receiveHandler }) {
    const bridge = new JsBridgeExtBackground_1.JsBridgeExtBackground({
        receiveHandler,
    });
    return bridge;
}
exports.default = {
    createHostBridge,
};
