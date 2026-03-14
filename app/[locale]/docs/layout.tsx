import type { ReactNode } from 'react';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <>{children}</>;
}
