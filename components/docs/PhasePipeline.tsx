import type { ReactNode } from 'react';
import PhaseCard, { type PhaseData } from './PhaseCard';

interface PhasePipelineProps {
  phases: PhaseData[];
}

export default function PhasePipeline({ phases }: PhasePipelineProps): ReactNode {
  return (
    <section aria-label="JARFIS phase pipeline" className="my-8">
      <ol
        role="list"
        aria-label="Phase pipeline"
        className="list-none p-0 m-0"
      >
        {phases.map((phase, index) => {
          const isLast = index === phases.length - 1;
          return (
            <PhaseCard
              key={`${phase.id}-${index}`}
              phase={phase}
              isLast={isLast}
            />
          );
        })}
      </ol>
    </section>
  );
}
