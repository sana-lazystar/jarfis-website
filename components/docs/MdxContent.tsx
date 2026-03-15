'use client';

import { useMemo } from 'react';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import PhasePipeline from '@/components/docs/PhasePipeline';
import AgentGrid from '@/components/docs/AgentGrid';
import GateCard from '@/components/docs/GateCard';
import ArtifactList from '@/components/docs/ArtifactList';
import CommandCard from '@/components/docs/CommandCard';
import StateFieldTable from '@/components/docs/StateFieldTable';

const mdxComponents = {
  PhasePipeline,
  AgentGrid,
  GateCard,
  ArtifactList,
  CommandCard,
  StateFieldTable,
};

interface MdxContentProps {
  compiledSource: string;
}

export default function MdxContent({ compiledSource }: MdxContentProps) {
  const Content = useMemo(() => {
    const scope = { opts: { ...jsxRuntime } };
    const keys = Object.keys(scope);
    const values = Object.values(scope);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hydrateFn = Reflect.construct(Function, [...keys, compiledSource] as any[]);
    return (hydrateFn.apply(hydrateFn, values) as { default: React.ComponentType<{ components: typeof mdxComponents }> }).default;
  }, [compiledSource]);

  return React.createElement(Content, { components: mdxComponents });
}
