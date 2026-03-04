import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://sana-lazystar.github.io',
  base: '/jarfis-website',

  i18n: {
    locales: ['en', 'ko', 'ja', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
    fallback: {
      ko: 'en',
      ja: 'en',
      zh: 'en',
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ko: 'ko',
          ja: 'ja',
          zh: 'zh',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
