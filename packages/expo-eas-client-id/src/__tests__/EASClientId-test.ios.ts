import { NativeModulesProxy } from 'expo-modules-core';

import * as EASClientId from '../EASClientId';

test('module works', async () => {
  await EASClientId.getClientIdAsync();
  expect(NativeModulesProxy.EASClientId.getClientIdAsync).toHaveBeenCalledTimes(1);
});
