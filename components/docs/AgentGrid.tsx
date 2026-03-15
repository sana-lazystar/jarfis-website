import type { ReactNode } from 'react';
import AgentCard, { type AgentData } from './AgentCard';

interface AgentGridProps {
  agents: AgentData[];
}

export default function AgentGrid({ agents }: AgentGridProps): ReactNode {
  return (
    <section aria-label="JARFIS agent roles" className="my-8">
      <div
        role="list"
        aria-label="Agent roles"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
      >
        {agents.map((agent) => (
          <AgentCard key={agent.abbr} agent={agent} />
        ))}
      </div>
    </section>
  );
}
