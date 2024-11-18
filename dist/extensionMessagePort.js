function connect({ reconnect = false, name, onMessage, onConnect, }) {
    // eslint-disable-next-line no-useless-catch
    try {
        if (reconnect) {
            // noop
        }
        const port = chrome.runtime.connect({
            includeTlsChannelId: true,
            name,
        });
        if (chrome.runtime.lastError) {
            // NOT Working for port connect error
        }
        port.onMessage.addListener(onMessage);
        let cleanup;
        const onDisconnect = () => {
            // TODO re-connect to background
            port.onMessage.removeListener(onMessage);
            port.onDisconnect.removeListener(onDisconnect);
            if (cleanup) {
                cleanup();
            }
        };
        port.onDisconnect.addListener(onDisconnect);
        if (onConnect) {
            cleanup = onConnect(port);
        }
        return port;
    }
    catch (error) {
        // NOT Working for port connect error
        throw error;
    }
}
export default {
    connect,
};
