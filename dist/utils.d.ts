/// <reference types="chrome" />
declare function getOriginFromPort(port: chrome.runtime.Port, { skipError }?: {
    skipError?: boolean;
}): string;
declare const _default: {
    getOriginFromPort: typeof getOriginFromPort;
};
export default _default;
