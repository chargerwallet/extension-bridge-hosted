/// <reference types="chrome" />
declare function connect({ reconnect, name, onMessage, onConnect, }: {
    reconnect?: boolean;
    name: string;
    onMessage: (payload: any, port: chrome.runtime.Port) => void;
    onConnect: (port: chrome.runtime.Port) => () => void;
}): chrome.runtime.Port;
declare const _default: {
    connect: typeof connect;
};
export default _default;
