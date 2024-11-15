"use strict";
// like injected + contentScript
Object.defineProperty(exports, "__esModule", { value: true });
const JsBridgeExtUi_1 = require("../JsBridgeExtUi");
function createUiJsBridge(config) {
    const bridge = new JsBridgeExtUi_1.JsBridgeExtUi(config);
    return bridge;
}
exports.default = {
    createUiJsBridge,
};
