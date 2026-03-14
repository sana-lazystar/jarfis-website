interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JARFIS',
  url: 'https://sana-lazystar.github.io/jarfis-website',
  logo: 'https://sana-lazystar.github.io/jarfis-website/favicon.svg',
  sameAs: ['https://github.com/sana-lazystar/jarfis'],
};

export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JARFIS',
  url: 'https://sana-lazystar.github.io/jarfis-website',
};
