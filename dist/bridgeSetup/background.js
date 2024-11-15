import { JsBridgeExtBackground } from '../JsBridgeExtBackground';
function createHostBridge({ receiveHandler }) {
    const bridge = new JsBridgeExtBackground({
        receiveHandler,
    });
    return bridge;
}
export default {
    createHostBridge,
};
