import Link from 'next/link';
import TerminalWindow from '@/components/terminal/TerminalWindow';

export default function NotFound() {
  return (
    <div
      style={{ backgroundColor: '#09090b', minHeight: '100vh' }}
      className="flex items-center justify-center px-4"
    >
      <div className="w-full max-w-lg">
        <TerminalWindow title="jarfis — zsh — error">
          <div className="space-y-2 font-mono text-sm">
            <p className="text-green-500">
              <span className="text-green-700">$ </span>cat page.txt
            </p>
            <p className="text-red-400">
              cat: page.txt: No such file or directory
            </p>
            <p className="text-zinc-600">&nbsp;</p>
            <p className="text-amber-400 font-bold text-xl">404</p>
            <p className="text-zinc-400">Page Not Found</p>
            <p className="text-zinc-600">&nbsp;</p>
            <p className="text-green-500">
              <span className="text-green-700">$ </span>
              <Link
                href="/en/"
                className="underline hover:text-green-300 transition-colors"
              >
                cd ~
              </Link>
            </p>
            <p className="text-zinc-500 text-xs mt-2">
              Press Enter to return home
            </p>
          </div>
        </TerminalWindow>

        <div className="mt-6 text-center">
          <Link
            href="/en/"
            className="inline-flex items-center gap-2 rounded border border-zinc-700 px-5 py-2.5 font-mono text-sm text-zinc-400 hover:border-green-500 hover:text-green-500 transition-colors"
          >
            <span>←</span>
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
