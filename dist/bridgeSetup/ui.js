// like injected + contentScript
import { JsBridgeExtUi } from '../JsBridgeExtUi';
function createUiJsBridge(config) {
    const bridge = new JsBridgeExtUi(config);
    return bridge;
}
export default {
    createUiJsBridge,
};
