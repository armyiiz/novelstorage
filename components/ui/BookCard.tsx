import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link
      href={`/read/${book.id}`}
      className={cn("group flex flex-col gap-2 transition-opacity hover:opacity-90", className)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-md dark:bg-gray-800">
        <Image
          src={book.coverUrl}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        {/* Progress Overlay if reading */}
        {book.status === 'reading' && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-900/30 backdrop-blur-sm">
             <div
               className="h-full bg-bookmark-gold transition-all duration-500"
               style={{ width: `${book.progress}%` }}
             />
          </div>
        )}
      </div>
      <div className="space-y-1 px-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-midnight-blue dark:group-hover:text-bookmark-gold transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{book.author}</p>
      </div>
    </Link>
  );
}
