import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-20" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-mono text-xl font-bold text-green-500">
              <span className="text-zinc-500">$ </span>jarfis
            </p>
            <p className="mt-2 text-sm text-zinc-500">{t('tagline')}</p>
            <p className="mt-4 font-mono text-xs text-zinc-600">{t('license')}</p>
          </div>

          {/* Project */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-zinc-300">{t('project')}</h3>
            <ul className="mt-3 space-y-2" role="list">
              <li>
                <a
                  href="https://github.com/sana-lazystar/jarfis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('github_link')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sana-lazystar/jarfis/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('releases')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sana-lazystar/jarfis/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('changelog')}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-zinc-300">{t('resources')}</h3>
            <ul className="mt-3 space-y-2" role="list">
              <li>
                <Link
                  href="/en/docs/"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('documentation')}
                </Link>
              </li>
              <li>
                <Link
                  href="/en/docs/getting-started/"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('quick_start')}
                </Link>
              </li>
              <li>
                <Link
                  href="/en/features/"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('features_link')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-zinc-300">{t('community')}</h3>
            <ul className="mt-3 space-y-2" role="list">
              <li>
                <a
                  href="https://github.com/sana-lazystar/jarfis/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('discussions')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sana-lazystar/jarfis/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('issues')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sana-lazystar/jarfis/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors"
                >
                  <span className="text-zinc-700">$ </span>{t('contributing')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <p className="font-mono text-xs text-zinc-700">
            {t('built_with')}
          </p>
        </div>
      </div>
    </footer>
  );
}
