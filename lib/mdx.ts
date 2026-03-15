import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

export interface MdxContent {
  compiledSource: string;
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

  const compiled = await compile(content, {
    outputFormat: 'function-body',
    development: false,
    // No providerImportSource — components passed via props
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

  return {
    compiledSource: String(compiled),
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
