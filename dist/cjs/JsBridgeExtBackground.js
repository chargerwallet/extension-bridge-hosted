"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsBridgeExtBackground = void 0;
const isFunction_1 = __importDefault(require("lodash/isFunction"));
const entries_1 = __importDefault(require("lodash/entries"));
const utils_1 = __importDefault(require("./utils"));
const uuid = __importStar(require("uuid"));
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
const { EXT_PORT_OFFSCREEN_TO_BG, EXT_PORT_CS_TO_BG, EXT_PORT_UI_TO_BG } = cross_inpage_provider_core_1.consts;
class JsBridgeExtBackground extends cross_inpage_provider_core_1.JsBridgeBase {
    constructor(config) {
        super(config);
        this.sendAsString = false;
        this.ports = {};
        this.setupMessagePortOnConnect();
    }
    addPort({ portId, port }) {
        this.ports[portId] = port;
        if (port.name === EXT_PORT_OFFSCREEN_TO_BG) {
            this.offscreenPort = port;
            this.offscreenPortId = portId;
        }
    }
    removePort({ portId, port }) {
        delete this.ports[portId];
        if (port.name === EXT_PORT_OFFSCREEN_TO_BG) {
            this.offscreenPort = undefined;
            this.offscreenPortId = undefined;
        }
    }
    sendPayload(payload0) {
        const payload = payload0;
        if (!payload.remoteId) {
            return;
        }
        const port = this.ports[payload.remoteId];
        const portOrigin = utils_1.default.getOriginFromPort(port);
        const requestOrigin = (payload === null || payload === void 0 ? void 0 : payload.peerOrigin) || '';
        if (!portOrigin) {
            throw new Error('port origin not found, maybe its destroyed');
        }
        if (portOrigin && requestOrigin && portOrigin !== requestOrigin) {
            throw new Error(`Origin not matched! expected: ${requestOrigin}, actual: ${portOrigin} .`);
        }
        // TODO onDisconnect remove ports cache
        //    try catch error test
        try {
            port.postMessage(payload);
        }
        catch (err) {
            const error = err;
            // TODO message maybe different in browser
            if (error && (error === null || error === void 0 ? void 0 : error.message) === 'Attempting to use a disconnected port object') {
                console.error('onDisconnect handler');
            }
            throw error;
        }
    }
    setupMessagePortOnConnect() {
        // TODO removeListener
        chrome.runtime.onConnect.addListener((port) => {
            /* port.sender
                        frameId: 0
                        id: "nhccmkonbhjkihmkjcodcepopkjpldoa"
                        origin: "https://app.uniswap.org"
                        tab: {active: true, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://app.uniswap.org/favicon.png', …}
                        url: "https://app.uniswap.org/#/swap"
                   */
            // content-script may be multiple
            if (port.name === EXT_PORT_CS_TO_BG ||
                port.name === EXT_PORT_UI_TO_BG ||
                port.name === EXT_PORT_OFFSCREEN_TO_BG) {
                const portId = uuid.v4();
                this.addPort({
                    portId,
                    port,
                });
                const onMessage = (payload, port0) => {
                    const origin = utils_1.default.getOriginFromPort(port0);
                    payload.remoteId = portId;
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    const jsBridge = this;
                    // TODO if EXT_PORT_CS_TO_BG ignore "internal_" prefix methods
                    //    ignore scope=walletPrivate
                    // - receive
                    jsBridge.receive(payload, {
                        origin,
                        // TODO trust origin
                        // only trust message from UI/Offscreen, but NOT from content-script(dapp)
                        internal: port.name === EXT_PORT_UI_TO_BG || port.name === EXT_PORT_OFFSCREEN_TO_BG,
                    });
                };
                // #### content-script -> background
                port.onMessage.addListener(onMessage);
                // TODO onDisconnect remove ports cache
                const onDisconnect = () => {
                    port.onMessage.removeListener(onMessage);
                    port.onDisconnect.removeListener(onDisconnect);
                    this.removePort({
                        portId,
                        port,
                    });
                };
                port.onDisconnect.addListener(onDisconnect);
            }
        });
    }
    requestToOffscreen(data) {
        if (!this.offscreenPort) {
            throw new Error('offscreenPort not ready.');
        }
        return this.request({ data, remoteId: this.offscreenPortId });
    }
    requestToAllCS(scope, data, targetOrigin) {
        // TODO optimize rename: broadcastRequest
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        (0, entries_1.default)(this.ports).forEach(([portId, port]) => __awaiter(this, void 0, void 0, function* () {
            if (port.name === EXT_PORT_CS_TO_BG) {
                const origin = utils_1.default.getOriginFromPort(port);
                if ((0, isFunction_1.default)(data)) {
                    // eslint-disable-next-line no-param-reassign
                    data = yield data({ origin });
                }
                // Send a notification to the port of the specified origin
                if (!targetOrigin || targetOrigin === origin) {
                    // TODO check ports disconnected
                    this.requestSync({
                        data,
                        scope,
                        remoteId: portId,
                    });
                }
            }
            void 0;
        }));
    }
    requestToAllUi(data) {
        // TODO optimize
        (0, entries_1.default)(this.ports).forEach(([portId, port]) => {
            if (port.name === EXT_PORT_UI_TO_BG) {
                // TODO check ports disconnected
                this.requestSync({
                    data,
                    remoteId: portId,
                });
            }
        });
    }
}
exports.JsBridgeExtBackground = JsBridgeExtBackground;
