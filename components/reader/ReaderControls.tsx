"use client";

import { useState } from "react";
import { useReaderStore } from "@/store/useReaderStore";
import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Book } from "@/lib/mockData";

interface ReaderControlsProps {
  isVisible: boolean;
  book: Book;
}

export function ReaderControls({ isVisible, book }: ReaderControlsProps) {
  const {
    fontSize, setFontSize,
    theme, setTheme,
    fontFamily, setFontFamily,
    currentChapterId, setCurrentChapterId
  } = useReaderStore();

  const [showTOC, setShowTOC] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white/95 px-4 py-3 shadow-sm transition-transform duration-300 dark:bg-zinc-900/95",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <Link href="/" className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="line-clamp-1 max-w-[60%] text-sm font-semibold text-slate-900 dark:text-white">{book.title}</h1>
        <button
          onClick={() => setShowTOC(true)}
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Table of Contents Drawer */}
      {showTOC && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setShowTOC(false)}>
          <div className="h-full w-4/5 max-w-sm bg-white shadow-2xl dark:bg-zinc-900 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">สารบัญ</h2>
              <button onClick={() => setShowTOC(false)} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {book.chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setCurrentChapterId(chapter.id);
                    setShowTOC(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm transition-colors",
                    currentChapterId === chapter.id
                      ? "bg-bookmark-gold/10 text-bookmark-gold font-semibold"
                      : "hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300"
                  )}
                >
                  {chapter.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar (Settings) */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white/95 px-6 py-6 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] transition-transform duration-300 dark:bg-zinc-900/95",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="mx-auto max-w-md space-y-6">
          {/* Theme Toggles */}
          <div className="flex justify-center gap-6">
            <ThemeButton active={theme === 'light'} onClick={() => setTheme('light')} bg="bg-white" label="Light" />
            <ThemeButton active={theme === 'sepia'} onClick={() => setTheme('sepia')} bg="bg-[#f4ecd8]" label="Sepia" />
            <ThemeButton active={theme === 'dark'} onClick={() => setTheme('dark')} bg="bg-[#1a1a1a]" label="Dark" />
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between rounded-lg bg-slate-100 p-2 dark:bg-zinc-800">
            <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="flex h-10 w-10 items-center justify-center rounded hover:bg-white dark:hover:bg-zinc-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">A</span>
            </button>
            <span className="text-xs font-medium text-slate-500">{fontSize}px</span>
            <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="flex h-10 w-10 items-center justify-center rounded hover:bg-white dark:hover:bg-zinc-700">
              <span className="text-xl font-bold text-slate-700 dark:text-slate-300">A</span>
            </button>
          </div>

           {/* Font Family */}
           <div className="flex justify-center gap-4">
            <button onClick={() => setFontFamily('sans')} className={cn("px-4 py-2 text-sm rounded-full border transition-colors", fontFamily === 'sans' ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black" : "border-slate-300 text-slate-600 dark:border-zinc-700 dark:text-slate-400")}>Sarabun</button>
            <button onClick={() => setFontFamily('serif')} className={cn("px-4 py-2 text-sm rounded-full border font-serif transition-colors", fontFamily === 'serif' ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black" : "border-slate-300 text-slate-600 dark:border-zinc-700 dark:text-slate-400")}>Noto Serif</button>
          </div>
        </div>
      </div>
    </>
  );
}

function ThemeButton({ active, onClick, bg, label }: { active: boolean, onClick: () => void, bg: string, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-10 w-10 rounded-full border shadow-sm transition-all active:scale-95 flex items-center justify-center",
        bg,
        active ? "ring-2 ring-bookmark-gold ring-offset-2 dark:ring-offset-zinc-900 border-transparent" : "border-slate-200 dark:border-zinc-700"
      )}
      aria-label={label}
    >
        {active && <div className="h-2 w-2 rounded-full bg-bookmark-gold" />}
    </button>
  );
}
