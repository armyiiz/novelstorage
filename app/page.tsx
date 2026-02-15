import { mockBooks } from "@/lib/mockData";
import { BookCard } from "@/components/ui/BookCard";
import { HeroSection } from "@/components/ui/HeroSection";
import { MobileNav } from "@/components/layout/MobileNav";

export default function Home() {
  // Sort by progress descending to find the most recently read (simulated)
  const readingBooks = mockBooks
    .filter(b => b.status === 'reading')
    .sort((a, b) => b.progress - a.progress);

  const latestBook = readingBooks[0];

  // Show all other books in the grid
  const otherBooks = mockBooks.filter(b => b.id !== latestBook?.id);

  return (
    <main className="min-h-screen bg-soft-paper pb-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <HeroSection latestBook={latestBook} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Collection</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">{mockBooks.length} Books</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {otherBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
      <MobileNav />
    </main>
  );
}
