// CRT Scanline overlay - CSS-only, no client JS required
// The global body::after in globals.css handles the base scanline effect
// This component adds an additional overlay for terminal-specific CRT feel

export default function CRTEffect({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
        mixBlendMode: 'multiply',
      }}
    />
  );
}
