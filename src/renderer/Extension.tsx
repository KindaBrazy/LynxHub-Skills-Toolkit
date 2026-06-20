import {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  // Inject a basic widget into the title bar
  lynxAPI.titleBar.addEnd(() => (
    <div className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
      Hello from Template Extension!
    </div>
  ));
}
