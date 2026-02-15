import { mockBooks } from "@/lib/mockData";
import { ReaderWrapper } from "@/components/reader/ReaderWrapper";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return mockBooks.map((book) => ({
    id: book.id,
  }));
}

export default async function ReaderPage({ params }: PageProps) {
  const { id } = await params;
  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    notFound();
  }

  // Pass the whole book object to the client component
  // which will handle state for current chapter
  return <ReaderWrapper book={book} />;
}
