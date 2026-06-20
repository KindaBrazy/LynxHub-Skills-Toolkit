import './index.css';

import {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';

import TestComp from './TestComp';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  // Inject a basic widget into the title bar
  lynxAPI.titleBar.addEnd(TestComp);
}
