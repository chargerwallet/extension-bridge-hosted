export declare const bridgeSetup: {
    contentScript: {
        inject: ({ file, code, remove, }: {
            file?: string | undefined;
            code?: string | undefined;
            remove?: boolean | undefined;
        }) => void;
        setupMessagePort: (options?: import("@chargerwallet/cross-inpage-provider-types").IOptionsWithDebugLogger) => void;
    };
    ui: {
        createUiJsBridge: (config: import("..").IJsBridgeExtUiConfig) => import("../JsBridgeExtUi").JsBridgeExtUi;
    };
    background: {
        createHostBridge: ({ receiveHandler }: {
            receiveHandler: import("@chargerwallet/cross-inpage-provider-types").IJsBridgeReceiveHandler;
        }) => import("../JsBridgeExtBackground").JsBridgeExtBackground;
    };
    offscreen: {
        createOffscreenJsBridge: (config: import("..").IJsBridgeExtOffscreenConfig) => import("../JsBridgeExtOffscreen").JsBridgeExtOffscreen;
    };
};
