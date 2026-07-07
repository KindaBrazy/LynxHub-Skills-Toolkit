import {ToolsCard} from '@lynx/components/ToolsCard';
import {BookOpen} from 'lucide-react';

export function SkillsToolkitCard() {
  return (
    <ToolsCard
      id="skills-toolkit"
      onPress={() => {
        window.dispatchEvent(new CustomEvent('open-skills-manager'));
      }}
      title="Skills Manager"
      icon={<BookOpen className="size-6 text-emerald-400" />}
      description="Discover, install, update, and manage agent skills from the Vercel Labs registry."
    />
  );
}

export default SkillsToolkitCard;
