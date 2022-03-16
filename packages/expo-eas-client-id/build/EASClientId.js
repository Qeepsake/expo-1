import { NativeModulesProxy } from 'expo-modules-core';
const { EASClientId } = NativeModulesProxy;
export async function getClientIdAsync() {
    return await EASClientId.getClientIdAsync();
}
//# sourceMappingURL=EASClientId.js.map