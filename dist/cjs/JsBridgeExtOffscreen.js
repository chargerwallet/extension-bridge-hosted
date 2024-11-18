"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsBridgeExtOffscreen = void 0;
const extensionMessagePort_1 = __importDefault(require("./extensionMessagePort"));
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
const utils_1 = __importDefault(require("./utils"));
const { EXT_PORT_OFFSCREEN_TO_BG } = cross_inpage_provider_core_1.consts;
class JsBridgeExtOffscreen extends cross_inpage_provider_core_1.JsBridgeBase {
    constructor(config) {
        super(config);
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
        extensionMessagePort_1.default.connect({
            name: EXT_PORT_OFFSCREEN_TO_BG,
            // #### background -> offscreen
            onMessage: (payload, port0) => {
                let origin = utils_1.default.getOriginFromPort(port0, { skipError: true }) || '';
                // in ext offscreen, port.sender?.origin is always empty,
                //    so we trust remote (background) origin
                origin = origin || payload.origin || '';
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const jsBridge = this;
                jsBridge.receive(payload, {
                    origin,
                    // trust message from background
                    internal: port0.name === EXT_PORT_OFFSCREEN_TO_BG,
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
exports.JsBridgeExtOffscreen = JsBridgeExtOffscreen;
