/// <reference types="chrome" />
import { IJsBridgeConfig, IJsBridgeMessagePayload } from '@chargerwallet/cross-inpage-provider-types';
import { JsBridgeBase } from '@chargerwallet/cross-inpage-provider-core';
export type IJsBridgeExtUiConfig = IJsBridgeConfig & {
    onPortConnect: (port0: chrome.runtime.Port) => void;
};
declare class JsBridgeExtUi extends JsBridgeBase {
    constructor(config: IJsBridgeExtUiConfig);
    isExtUi: boolean;
    sendAsString: boolean;
    private portToBg;
    sendPayload(payload: IJsBridgeMessagePayload | string): void;
    setupMessagePortConnect(config: IJsBridgeExtUiConfig): void;
}
export { JsBridgeExtUi };
