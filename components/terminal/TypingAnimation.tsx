'use client';

import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'success' | 'info' | 'blank';
  delay?: number;
}

interface TypingAnimationProps {
  lines: TerminalLine[];
  typingSpeed?: number;
  lineDelay?: number;
  className?: string;
}

function getLineColor(type: TerminalLine['type']): string {
  switch (type) {
    case 'command': return 'text-green-400';
    case 'success': return 'text-green-500';
    case 'info': return 'text-violet-400';
    case 'output': return 'text-zinc-400';
    case 'blank': return '';
    default: return 'text-zinc-400';
  }
}

export default function TypingAnimation({
  lines,
  typingSpeed = 40,
  lineDelay = 600,
  className = '',
}: TypingAnimationProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // reduced-motion: 모든 라인을 즉시 표시
    if (prefersReducedMotion.current) {
      setDisplayedLines(lines.map((l) => l.text));
      setCurrentLineIndex(lines.length);
      setIsTyping(false);
      return;
    }
  }, [lines]);

  useEffect(() => {
    if (prefersReducedMotion.current || currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentLine.type === 'blank') {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, '']);
        setCurrentLineIndex((prev) => prev + 1);
      }, lineDelay / 2);
      return () => clearTimeout(timer);
    }

    if (currentText.length < currentLine.text.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentLine.text.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    }

    // 현재 라인 완성
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, currentLine.text]);
      setCurrentText('');
      setCurrentLineIndex((prev) => prev + 1);
    }, lineDelay);
    return () => clearTimeout(timer);
  }, [currentText, currentLineIndex, lines, typingSpeed, lineDelay]);

  const allLines = [...displayedLines];
  if (currentLineIndex < lines.length && currentText) {
    allLines.push(currentText);
  }

  return (
    <div className={`space-y-0.5 ${className}`} aria-live="polite" aria-atomic="false">
      {lines.slice(0, displayedLines.length).map((line, i) => (
        <div key={i} className={`${getLineColor(line.type)} min-h-[1.5em]`}>
          {line.type === 'command' && <span className="text-green-600 select-none">$ </span>}
          {displayedLines[i]}
        </div>
      ))}

      {currentLineIndex < lines.length && currentText && (
        <div className={`${getLineColor(lines[currentLineIndex].type)} min-h-[1.5em]`}>
          {lines[currentLineIndex].type === 'command' && (
            <span className="text-green-600 select-none">$ </span>
          )}
          {currentText}
          {isTyping && (
            <span
              className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse"
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
}
