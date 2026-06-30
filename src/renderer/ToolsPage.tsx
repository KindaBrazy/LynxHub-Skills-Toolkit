import {ToolsCard} from '@lynx/components/ToolsCard';
import {Cpu} from '@solar-icons/react-perf/BoldDuotone';

export default function ToolsPage() {
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
}
