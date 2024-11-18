import messagePort from './extensionMessagePort';
import { JsBridgeBase, consts } from '@chargerwallet/cross-inpage-provider-core';
import utils from './utils';
const { EXT_PORT_UI_TO_BG } = consts;
class JsBridgeExtUi extends JsBridgeBase {
    constructor(config) {
        super(config);
        this.isExtUi = true;
        this.sendAsString = false;
        this.portToBg = null;
        this.setupMessagePortConnect(config);
    }
    sendPayload(payload) {
        if (this.portToBg) {
            this.portToBg.postMessage(payload);
        }
    }
    setupMessagePortConnect(config) {
        messagePort.connect({
            name: EXT_PORT_UI_TO_BG,
            // #### background -> ui
            onMessage: (payload, port0) => {
                let origin = utils.getOriginFromPort(port0, { skipError: true }) || '';
                // in ext ui, port.sender?.origin is always empty,
                //    so we trust remote (background) origin
                origin = origin || payload.origin || '';
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const jsBridge = this;
                jsBridge.receive(payload, {
                    origin,
                    // trust message from background
                    internal: port0.name === EXT_PORT_UI_TO_BG,
                });
            },
            onConnect: (port) => {
                this.portToBg = port;
                setTimeout(() => {
                    config.onPortConnect(port);
                }, 0);
                return () => {
                    this.portToBg = null;
                };
            },
        });
    }
}
export { JsBridgeExtUi };
