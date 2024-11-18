"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsBridgeSimple = void 0;
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
class JsBridgeSimple extends cross_inpage_provider_core_1.JsBridgeBase {
    constructor() {
        super(...arguments);
        this.sendAsString = true;
        this.isInjected = true;
        this.remote = null;
    }
    sendPayload(payload) {
        if (!this.remote) {
            throw new Error('JsBridgeSimple ERROR: remote not set.');
        }
        this.remote.receive(payload);
    }
    setRemote(remote) {
        this.remote = remote;
    }
}
exports.JsBridgeSimple = JsBridgeSimple;
