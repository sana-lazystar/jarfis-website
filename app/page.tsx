import { withBasePath } from '@/lib/paths';

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${withBasePath('/en/')}`} />
        <link rel="canonical" href={withBasePath('/en/')} />
      </head>
      <body />
    </html>
  );
}
