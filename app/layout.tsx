import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/paths';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | JARFIS',
    default: 'JARFIS — The Fantastic Way to Ship Software with AI',
  },
  description:
    'One slash command. Nine expert agents. JARFIS orchestrates your entire product workflow on Claude Code.',
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
