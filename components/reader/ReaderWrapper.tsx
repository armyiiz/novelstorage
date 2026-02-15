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
  const { theme } = useReaderStore();

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
    // Prevent toggle if clicking on interactive elements (though ReaderContent is mostly text)
    // But basic tap anywhere on text should toggle
    setControlsVisible((prev) => !prev);
  };

  // Background style based on theme
  const bgClass = theme === 'dark' ? 'bg-[#1a1a1a]' : theme === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-soft-paper';

  return (
    <div className={cn("min-h-screen transition-colors duration-300", bgClass)}>
      <ReaderControls isVisible={controlsVisible} title={book.title} />

      {/* Click handler wrapper */}
      <div onClick={handleTap} className="min-h-screen cursor-pointer">
        <ReaderContent content={book.content} />
      </div>
    </div>
  );
}
