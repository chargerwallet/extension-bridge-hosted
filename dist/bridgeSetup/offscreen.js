import { JsBridgeExtOffscreen } from '../JsBridgeExtOffscreen';
function createOffscreenJsBridge(config) {
    const bridge = new JsBridgeExtOffscreen(config);
    return bridge;
}
export default {
    createOffscreenJsBridge,
};
