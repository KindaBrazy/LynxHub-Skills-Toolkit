import './index.css';

import {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';

import SkillsManagerModal from './SkillsManagerModal';
import ToolsPage from './ToolsPage';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  // Register the modal component globally
  lynxAPI.addModal(SkillsManagerModal);

  // Add the card to the Tools page cards container
  lynxAPI.customizePages.tools.add.cardsContainer(ToolsPage);
}
