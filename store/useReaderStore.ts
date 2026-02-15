import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReaderState {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'sans' | 'serif';
  theme: 'light' | 'dark' | 'sepia';
  currentChapterId: string | null;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setFontFamily: (family: 'sans' | 'serif') => void;
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
  setCurrentChapterId: (id: string) => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      fontSize: 18,
      lineHeight: 1.6,
      fontFamily: 'sans', // Matches Tailwind font-sans (Sarabun)
      theme: 'light',
      currentChapterId: null,
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
      setFontFamily: (family) => set({ fontFamily: family }),
      setTheme: (theme) => set({ theme }),
      setCurrentChapterId: (id) => set({ currentChapterId: id }),
    }),
    {
      name: 'reader-storage',
    }
  )
);
