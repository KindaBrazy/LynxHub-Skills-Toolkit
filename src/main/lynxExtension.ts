import {ExtensionMainApi, MainExtensionUtils} from '@lynx_main/plugins/extensions/types';

export async function initialExtension(lynxApi: ExtensionMainApi, utils: MainExtensionUtils) {
  // Listen for the host application boot sequence
  lynxApi.onAppReady(async () => {
    console.log('Extension backend successfully initialized!');
  });
}
