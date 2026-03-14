import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | JARFIS',
    default: 'JARFIS — The Fantastic Way to Ship Software with AI',
  },
  description:
    'One slash command. Nine expert agents. JARFIS orchestrates your entire product workflow on Claude Code.',
  metadataBase: new URL('https://sana-lazystar.github.io/jarfis-website'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'none';" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/jarfis-website/favicon.ico" sizes="any" />
        <link rel="icon" href="/jarfis-website/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
