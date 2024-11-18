import { JsBridgeBase } from '@chargerwallet/cross-inpage-provider-core';
class JsBridgeSimple extends JsBridgeBase {
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
export { JsBridgeSimple };
