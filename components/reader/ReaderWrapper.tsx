"use client";

import { useState, useEffect } from "react";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { ReaderContent } from "@/components/reader/ReaderContent";
import { useReaderStore } from "@/store/useReaderStore";
import { Book } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ReaderWrapperProps {
  book: Book;
}

export function ReaderWrapper({ book }: ReaderWrapperProps) {
  const [controlsVisible, setControlsVisible] = useState(true);
  const { theme, currentChapterId, setCurrentChapterId } = useReaderStore();

  // Initialize current chapter from book if not set or if book changed
  useEffect(() => {
    // If store is empty, or we are on a new book, set default chapter
    // Note: In a real app we might want to track bookId in store too
    if (!currentChapterId) {
        // Default to first chapter if available, or the one specified in book
        const initialChapterId = book.currentChapterId || book.chapters[0]?.id;
        if (initialChapterId) {
            setCurrentChapterId(initialChapterId);
        }
    } else {
        // Check if currentChapterId belongs to this book
        const chapterExists = book.chapters.find(c => c.id === currentChapterId);
        if (!chapterExists) {
             const initialChapterId = book.currentChapterId || book.chapters[0]?.id;
             if (initialChapterId) {
                 setCurrentChapterId(initialChapterId);
             }
        }
    }
  }, [book, currentChapterId, setCurrentChapterId]);

  const activeChapter = book.chapters.find(c => c.id === currentChapterId) || book.chapters[0];

  // Handle scroll to hide controls
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down more than 10px and not at top
      if (currentScrollY > lastScrollY + 10 && currentScrollY > 50) {
        setControlsVisible(false);
      }
      // Show if scrolling up more than 10px
      else if (currentScrollY < lastScrollY - 10) {
        setControlsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle tap to toggle controls
  const handleTap = () => {
    setControlsVisible((prev) => !prev);
  };

  const handleChapterSelect = (chapterId: string) => {
      setCurrentChapterId(chapterId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Background style based on theme
  const bgClass = theme === 'dark' ? 'bg-[#1a1a1a]' : theme === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-soft-paper';

  return (
    <div className={cn("min-h-screen transition-colors duration-300", bgClass)}>
      <ReaderControls
        isVisible={controlsVisible}
        book={book}
        onChapterSelect={handleChapterSelect}
      />

      {/* Click handler wrapper */}
      <div onClick={handleTap} className="min-h-screen cursor-pointer pt-10">
        <ReaderContent content={activeChapter?.content || "Content not found."} />
      </div>
    </div>
  );
}
