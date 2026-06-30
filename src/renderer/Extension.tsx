import './index.css';

import {ToolsCard} from '@lynx/components/ToolsCard';
import {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';
import {Cpu} from '@solar-icons/react-perf/BoldDuotone';

import SkillsManagerModal from './SkillsManagerModal';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  // Register the modal component globally
  lynxAPI.addModal(SkillsManagerModal);

  // Add the card to the Tools page cards container
  lynxAPI.customizePages.tools.add.cardsContainer(() => {
    return (
      <ToolsCard
        onPress={() => {
          window.dispatchEvent(new CustomEvent('open-skills-manager'));
        }}
        title="Skills Manager"
        icon={<Cpu className="size-6 text-white" />}
        description="Discover, install, update, and manage agent skills from the Vercel Labs registry."
      />
    );
  });
}
