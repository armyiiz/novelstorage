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

  // Set initial chapter if not set (default to first chapter)
  useEffect(() => {
    // Check if currentChapterId in Store actually exists in this book
    const chapterExists = book.chapters.find(c => c.id === currentChapterId);

    // If no chapter ID set, OR the ID doesn't exist in this book (e.g. switched books)
    // then reset to first chapter
    if (!chapterExists && book.chapters.length > 0) {
      setCurrentChapterId(book.chapters[0].id);
    }
  }, [book, currentChapterId, setCurrentChapterId]);

  // Find current chapter content
  const activeChapter = book.chapters.find(c => c.id === currentChapterId) || book.chapters[0];

  // Handle scroll to hide controls
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 10 && currentScrollY > 50) {
        setControlsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setControlsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTap = () => {
    setControlsVisible((prev) => !prev);
  };

  const bgClass = theme === 'dark' ? 'bg-[#1a1a1a]' : theme === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-soft-paper';

  return (
    <div className={cn("min-h-screen transition-colors duration-300", bgClass)}>
      <ReaderControls isVisible={controlsVisible} book={book} />
      <div onClick={handleTap} className="min-h-screen cursor-pointer">
        {/* Render Active Chapter Content */}
        <ReaderContent content={activeChapter?.content || "<p>Chapter not found.</p>"} />
      </div>
    </div>
  );
}
