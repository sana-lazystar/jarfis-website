import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { createElement } from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import type { ReactElement } from 'react';
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
