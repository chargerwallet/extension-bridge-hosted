/// <reference types="chrome" />
import { IInjectedProviderNamesStrings, IJsBridgeConfig, IJsBridgeMessagePayload } from '@chargerwallet/cross-inpage-provider-types';
import { JsBridgeBase } from '@chargerwallet/cross-inpage-provider-core';
declare class JsBridgeExtBackground extends JsBridgeBase {
    constructor(config: IJsBridgeConfig);
    sendAsString: boolean;
    ports: Record<number | string, chrome.runtime.Port>;
    offscreenPort: chrome.runtime.Port | undefined;
    offscreenPortId: number | string | undefined;
    addPort({ portId, port }: {
        portId: number | string;
        port: chrome.runtime.Port;
    }): void;
    removePort({ portId, port }: {
        portId: number | string;
        port: chrome.runtime.Port;
    }): void;
    sendPayload(payload0: IJsBridgeMessagePayload | string): void;
    setupMessagePortOnConnect(): void;
    requestToOffscreen(data: unknown): Promise<import("@chargerwallet/cross-inpage-provider-types").IJsonRpcResponse<unknown>> | undefined;
    requestToAllCS(scope: IInjectedProviderNamesStrings, data: unknown, targetOrigin?: string): void;
    requestToAllUi(data: unknown): void;
}
export { JsBridgeExtBackground };
