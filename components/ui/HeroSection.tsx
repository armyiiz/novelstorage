import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock } from "lucide-react";
import { Book } from "@/lib/mockData";

interface HeroSectionProps {
  latestBook?: Book;
}

export function HeroSection({ latestBook }: HeroSectionProps) {
  return (
    <section className="mb-8 space-y-6 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-midnight-blue dark:text-white">
          Welcome Back.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Pick up where you left off. The story is waiting.
        </p>
      </div>

      {latestBook ? (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:ring-slate-900/10 dark:bg-reading-dark dark:ring-white/10 dark:hover:ring-white/20">
          <div className="flex gap-5">
            <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg shadow-sm">
              <Image
                src={latestBook.coverUrl}
                alt={latestBook.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="100px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between py-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>Last Read</span>
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-midnight-blue dark:group-hover:text-bookmark-gold transition-colors">
                  {latestBook.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{latestBook.author}</p>
              </div>

              <Link
                href={`/read/${latestBook.id}`}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-bookmark-gold transition-colors hover:text-amber-600"
              >
                <BookOpen className="h-4 w-4" />
                Continue Reading
              </Link>
            </div>
          </div>
          {/* Progress Bar Background */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100 dark:bg-slate-800">
             <div
               className="h-full bg-bookmark-gold transition-all duration-700 ease-out"
               style={{ width: `${latestBook.progress}%` }}
             />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">No recent books found.</p>
          <Link href="/upload" className="mt-2 text-sm font-medium text-bookmark-gold hover:underline">
            Add a new book
          </Link>
        </div>
      )}
    </section>
  );
}
