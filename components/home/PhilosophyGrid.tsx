import { useTranslations } from 'next-intl';

export default function PhilosophyGrid() {
  const t = useTranslations('philosophies');
  const items = t.raw('items') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 border-t border-zinc-800/50">
      <div className="mb-12 text-center">
        <p className="font-mono text-green-500 text-sm mb-3">{t('subtitle')}</p>
        <h2 className="font-mono text-3xl font-bold text-zinc-50 tracking-tight">
          {t('title')}
        </h2>
      </div>

      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="9 Philosophies"
      >
        {items.map((item) => (
          <div
            key={item.number}
            role="listitem"
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <span
                className="font-mono text-2xl font-bold text-green-500/40 group-hover:text-green-500/60 transition-colors leading-none mt-0.5 shrink-0"
                aria-hidden="true"
              >
                {item.number}
              </span>
              <div>
                <h3 className="font-mono text-sm font-semibold text-zinc-100 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
