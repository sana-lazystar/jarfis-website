'use client';

import { Suspense } from 'react';
import TerminalWindow from '@/components/terminal/TerminalWindow';
import TypingAnimation from '@/components/terminal/TypingAnimation';
import CRTEffect from '@/components/terminal/CRTEffect';

interface HeroTerminalProps {
  locale: string;
}

const TERMINAL_LINES = [
  { text: 'jarfis:work Build a user authentication system', type: 'command' as const },
  { text: '', type: 'blank' as const },
  { text: '[Phase T] Triage — classifying request...', type: 'info' as const },
  { text: '[Phase 0] Pre-flight — loading context...', type: 'info' as const },
  { text: '', type: 'blank' as const },
  { text: '[PO] Analyzing requirements...', type: 'output' as const },
  { text: '[PO] PRD generated. Gate 1 ready.', type: 'success' as const },
  { text: '', type: 'blank' as const },
  { text: '[ARCH] Designing system architecture...', type: 'output' as const },
  { text: '[ARCH] 9 agents, 11 artifacts, 9 phases.', type: 'success' as const },
  { text: '', type: 'blank' as const },
  { text: '[FE] Implementing UI components...', type: 'output' as const },
  { text: '[BE] Building API endpoints...', type: 'output' as const },
  { text: '[QA] Running test strategy...', type: 'output' as const },
  { text: '', type: 'blank' as const },
  { text: 'All phases complete. Workflow done.', type: 'success' as const },
];

export default function HeroTerminal({ locale: _locale }: HeroTerminalProps) {
  return (
    <div className="relative">
      <TerminalWindow title="jarfis — zsh — 80x24" className="relative overflow-hidden">
        <CRTEffect />
        <Suspense
          fallback={
            <div className="text-zinc-600 font-mono text-sm">Loading terminal...</div>
          }
        >
          <TypingAnimation
            lines={TERMINAL_LINES}
            typingSpeed={35}
            lineDelay={500}
          />
        </Suspense>
      </TerminalWindow>
    </div>
  );
}
