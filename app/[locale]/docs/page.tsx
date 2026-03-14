'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DocsIndexPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    router.replace(`/${locale}/docs/getting-started/`);
  }, [locale, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="font-mono text-zinc-500 text-sm">
        <span className="text-green-500">$ </span>
        cd docs/getting-started...
      </p>
    </div>
  );
}
