import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReaderState {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'sans' | 'serif';
  theme: 'light' | 'dark' | 'sepia';
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setFontFamily: (family: 'sans' | 'serif') => void;
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      fontSize: 18,
      lineHeight: 1.6,
      fontFamily: 'sans', // Matches Tailwind font-sans (Sarabun)
      theme: 'light',
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
      setFontFamily: (family) => set({ fontFamily: family }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'reader-storage',
    }
  )
);
