import { IOptionsWithDebugLogger } from '@chargerwallet/cross-inpage-provider-types';
declare function inject({ file, code, remove, }: {
    file?: string;
    code?: string;
    remove?: boolean;
}): void;
declare function setupMessagePort(options?: IOptionsWithDebugLogger): void;
declare const _default: {
    inject: typeof inject;
    setupMessagePort: typeof setupMessagePort;
};
export default _default;
