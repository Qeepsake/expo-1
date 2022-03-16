import { NativeModulesProxy } from 'expo-modules-core';

const { EASClientId } = NativeModulesProxy;

export async function getClientIdAsync(): Promise<string> {
  return await EASClientId.getClientIdAsync();
}
