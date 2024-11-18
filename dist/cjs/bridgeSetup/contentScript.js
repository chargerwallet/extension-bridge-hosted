"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
const extensionMessagePort_1 = __importDefault(require("../extensionMessagePort"));
const cross_inpage_provider_core_2 = require("@chargerwallet/cross-inpage-provider-core");
const { EXT_PORT_CS_TO_BG, JS_BRIDGE_MESSAGE_DIRECTION, JS_BRIDGE_MESSAGE_EXT_CHANNEL } = cross_inpage_provider_core_1.consts;
// TODO one-time only
function inject({ file, code, remove = true, }) {
    // Manifest V2 Only
    if (code) {
        cross_inpage_provider_core_1.injectedFactory.injectCodeWithScriptTag({
            code,
            remove,
        });
    }
    // Manifest V3 & V2
    if (file) {
        cross_inpage_provider_core_1.injectedFactory.injectCodeWithScriptTag({
            file: chrome.runtime.getURL(file),
            remove,
        });
    }
}
// TODO one-time only
function setupMessagePort(options = {}) {
    const debugLogger = options.debugLogger || cross_inpage_provider_core_1.appDebugLogger;
    extensionMessagePort_1.default.connect({
        name: EXT_PORT_CS_TO_BG,
        // #### background -> content-script
        onMessage(payload) {
            // ignore legacy Ext publicConfig message
            if ((0, cross_inpage_provider_core_1.isLegacyExtMessage)(payload)) {
                return;
            }
            // #### content-script -> injected
            window.postMessage({
                channel: JS_BRIDGE_MESSAGE_EXT_CHANNEL,
                direction: JS_BRIDGE_MESSAGE_DIRECTION.HOST_TO_INPAGE,
                payload,
            });
        },
        onConnect(port) {
            // #### injected -> content-script
            const onWindowPostMessage = (event) => {
                // We only accept messages from ourselves
                if (event.source !== window) {
                    return;
                }
                const eventData = event.data;
                // only accept extension messages
                if (eventData.channel === JS_BRIDGE_MESSAGE_EXT_CHANNEL &&
                    eventData.direction === JS_BRIDGE_MESSAGE_DIRECTION.INPAGE_TO_HOST) {
                    debugLogger.extContentScripts('onWindowPostMessage', event.data);
                    // #### content-script -> background
                    port.postMessage(eventData.payload);
                }
            };
            window.addEventListener('message', onWindowPostMessage, false);
            return () => {
                cross_inpage_provider_core_2.commonLogger.error('CHARGERWALLET: lost connection to hosted bridge. You should reload page to establish a new connection.');
                window.dispatchEvent(new Event('chargerwallet_bridge_disconnect'));
                window.removeEventListener('message', onWindowPostMessage, false);
            };
        },
    });
}
//  -> inpage -> dapp injected jsBridge -> bridge.request()
//      -> window.postMessage
//  -> contentScript -> on message -> chrome.runtime.connect port
//      -> port.postMessage
//  -> background -> createJsBridgeHost -> chrome.runtime.onConnect.addListener -> bridge.receive()
//      -> port.postMessage
//  -> ui -> createJsBridgeInpage -> chrome.runtime.connect port -> bridge.receive()
exports.default = {
    inject,
    setupMessagePort,
};
