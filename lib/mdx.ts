import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';

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

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    content: compiledContent,
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
