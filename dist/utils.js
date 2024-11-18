import { commonLogger } from '@chargerwallet/cross-inpage-provider-core';
function getOriginFromPort(port, { skipError } = {}) {
    var _a, _b, _c;
    // chrome
    let origin = ((_a = port === null || port === void 0 ? void 0 : port.sender) === null || _a === void 0 ? void 0 : _a.origin) || '';
    // firefox
    if (!origin && ((_b = port === null || port === void 0 ? void 0 : port.sender) === null || _b === void 0 ? void 0 : _b.url)) {
        try {
            const uri = new URL((_c = port === null || port === void 0 ? void 0 : port.sender) === null || _c === void 0 ? void 0 : _c.url);
            origin = (uri === null || uri === void 0 ? void 0 : uri.origin) || '';
        }
        catch (error) {
            console.error(error);
        }
    }
    if (!origin && !skipError) {
        commonLogger.error('ERROR: origin not found from port sender', port);
    }
    return origin || '';
}
export default {
    getOriginFromPort,
};
