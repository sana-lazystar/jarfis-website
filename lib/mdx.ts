import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { createElement, type AnchorHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import type { ReactElement } from 'react';
import PhasePipeline from '@/components/docs/PhasePipeline';
import AgentGrid from '@/components/docs/AgentGrid';
import GateCard from '@/components/docs/GateCard';
import ArtifactList from '@/components/docs/ArtifactList';
import CommandCard from '@/components/docs/CommandCard';
import StateFieldTable from '@/components/docs/StateFieldTable';
import Callout from '@/components/docs/Callout';
import QuickGateCards from '@/components/docs/QuickGateCards';
import QuickPhaseList from '@/components/docs/QuickPhaseList';
import QuickAgentGrid from '@/components/docs/QuickAgentGrid';
import PrincipleZeroBanner from '@/components/docs/PrincipleZeroBanner';
import PrincipleGrid from '@/components/docs/PrincipleGrid';
import TensionList from '@/components/docs/TensionList';
import StateDiagram from '@/components/docs/StateDiagram';
import FlowDiagram from '@/components/docs/FlowDiagram';
import RoleConfigGrid from '@/components/docs/RoleConfigGrid';
import ModeGrid from '@/components/docs/ModeGrid';
import RecoveryFlow from '@/components/docs/RecoveryFlow';
import LearningGrid from '@/components/docs/LearningGrid';
import ExampleCard from '@/components/docs/ExampleCard';

/**
 * MDX 마크다운 링크([text](/path))에 대한 커스텀 앵커 컴포넌트.
 *
 * - 내부 링크 (/ 시작, // 아님): Next.js <Link>로 래핑 → basePath 자동 적용
 * - 앵커 링크 (# 시작): 순수 <a> 유지 (페이지 내 이동)
 * - 외부 링크 (http://, https:// 등): <a target="_blank" rel="noopener noreferrer">
 * - href 없음: 순수 <a> fallback
 */
function MdxAnchor({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  if (!href) {
    return createElement('a', props, children);
  }
  // 앵커 링크: 페이지 내 이동
  if (href.startsWith('#')) {
    return createElement('a', { href, ...props }, children);
  }
  // 내부 링크: /로 시작하며 //가 아닌 경우 → Next.js Link로 basePath 자동 적용
  if (href.startsWith('/') && !href.startsWith('//')) {
    return createElement(Link, { href, ...(props as Record<string, unknown>) }, children);
  }
  // 외부 링크 및 기타: 새 탭, 보안 rel 속성 부여
  return createElement(
    'a',
    { href, target: '_blank', rel: 'noopener noreferrer', ...props },
    children,
  );
}

const mdxComponents = {
  PhasePipeline,
  AgentGrid,
  GateCard,
  ArtifactList,
  CommandCard,
  StateFieldTable,
  // Shared
  Callout,
  QuickGateCards,
  // Getting Started
  QuickPhaseList,
  QuickAgentGrid,
  // Concepts
  PrincipleZeroBanner,
  PrincipleGrid,
  TensionList,
  StateDiagram,
  // Guides
  FlowDiagram,
  RoleConfigGrid,
  ModeGrid,
  RecoveryFlow,
  LearningGrid,
  ExampleCard,
  // MDX 마크다운 링크 basePath 자동 적용
  a: MdxAnchor,
};

export interface MdxContent {
  content: ReactElement;
  frontmatter: Record<string, unknown>;
}

const contentDir = path.join(process.cwd(), 'content');

export async function getMdxContent(filePath: string): Promise<MdxContent | null> {
  const fullPath = path.join(contentDir, filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { content, data } = matter(fileContent);

  // evaluate()는 서버에서 MDX를 컴파일+실행 → new Function() 미사용 → CSP unsafe-eval 불필요
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    rehypePlugins: [
      [
        rehypePrettyCode as never,
        {
          theme: 'github-dark',
          keepBackground: true,
        },
      ],
    ],
  });

  // 서버에서 커스텀 컴포넌트를 주입하여 ReactElement 생성
  const element = createElement(MDXContent, { components: mdxComponents });

  return {
    content: element,
    frontmatter: data,
  };
}

export function getMdxFiles(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);

  if (!fs.existsSync(fullDir)) {
    return [];
  }

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

export function getMdxFrontmatter(filePath: string): Record<string, unknown> | null {
  const fullPath = path.join(contentDir, filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { data } = matter(fileContent);
  return data;
}
