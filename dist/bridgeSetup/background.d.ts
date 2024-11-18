import { JsBridgeExtBackground } from '../JsBridgeExtBackground';
import { IJsBridgeReceiveHandler } from '@chargerwallet/cross-inpage-provider-types';
declare function createHostBridge({ receiveHandler }: {
    receiveHandler: IJsBridgeReceiveHandler;
}): JsBridgeExtBackground;
declare const _default: {
    createHostBridge: typeof createHostBridge;
};
export default _default;
