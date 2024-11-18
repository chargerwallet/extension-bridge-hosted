import { IJsBridgeMessagePayload } from '@chargerwallet/cross-inpage-provider-types';
import { JsBridgeBase } from '@chargerwallet/cross-inpage-provider-core';
declare class JsBridgeSimple extends JsBridgeBase {
    sendAsString: boolean;
    isInjected: boolean;
    private remote;
    sendPayload(payload: IJsBridgeMessagePayload | string): void;
    setRemote(remote: JsBridgeBase): void;
}
export { JsBridgeSimple };
