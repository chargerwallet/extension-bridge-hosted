/// <reference types="chrome" />
import { IJsBridgeConfig, IJsBridgeMessagePayload } from '@chargerwallet/cross-inpage-provider-types';
import { JsBridgeBase } from '@chargerwallet/cross-inpage-provider-core';
export type IJsBridgeExtOffscreenConfig = IJsBridgeConfig & {
    onPortConnect: (port0: chrome.runtime.Port) => void;
};
declare class JsBridgeExtOffscreen extends JsBridgeBase {
    constructor(config: IJsBridgeExtOffscreenConfig);
    sendAsString: boolean;
    private portToBg;
    sendPayload(payload: IJsBridgeMessagePayload | string): void;
    setupMessagePortConnect(config: IJsBridgeExtOffscreenConfig): void;
}
export { JsBridgeExtOffscreen };
