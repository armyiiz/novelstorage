"use client";

import { useReaderStore } from "@/store/useReaderStore";
import { cn } from "@/lib/utils";

interface ReaderContentProps {
  content: string;
}

export function ReaderContent({ content }: ReaderContentProps) {
  const { fontSize, lineHeight, fontFamily, theme } = useReaderStore();

  // Font classes
  const fontClass = fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  // Theme classes for text container
  const themeClass = theme === 'dark' ? 'text-slate-300' : theme === 'sepia' ? 'text-[#5b4636]' : 'text-slate-900';

  return (
    <div
      className={cn(
        "mx-auto max-w-2xl px-6 py-24 transition-all duration-300 ease-in-out md:px-8",
        fontClass,
        themeClass
      )}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
