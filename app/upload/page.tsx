"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
  const [fileName, setFileName] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setStatus('uploading');

    // Simulate upload
    setTimeout(() => {
      setStatus('processing');
      // Simulate processing
      setTimeout(() => {
        setStatus('done');
      }, 2000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-soft-paper pb-24 dark:bg-black">
      <div className="mx-auto max-w-2xl px-6 pt-12">
        <h1 className="mb-2 text-2xl font-bold text-midnight-blue dark:text-white">Expand Your Collection.</h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">Drop your EPUBs here. We&apos;ll handle the rest.</p>

        {status === 'idle' && (
          <div
            className={cn(
              "relative flex h-64 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
              dragActive ? "border-bookmark-gold bg-amber-50 dark:bg-amber-900/10" : "border-slate-300 bg-white dark:border-slate-700 dark:bg-zinc-900"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleChange}
              accept=".epub,.pdf"
            />
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-slate-100 p-4 dark:bg-zinc-800">
                <Upload className="h-8 w-8 text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">EPUB, PDF (Max 50MB)</p>
              </div>
            </div>
          </div>
        )}

        {status === 'uploading' && (
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-zinc-900">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-bookmark-gold" />
            <p className="font-medium text-slate-900 dark:text-white">Uploading {fileName}...</p>
          </div>
        )}

        {status === 'processing' && (
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-zinc-900">
            <FileText className="mb-4 h-10 w-10 animate-pulse text-bookmark-gold" />
            <p className="font-medium text-slate-900 dark:text-white">Processing metadata...</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Creating cover image and chapters</p>
          </div>
        )}

        {status === 'done' && (
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
            <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
            <p className="text-lg font-medium text-green-700 dark:text-green-400">Upload Complete!</p>
            <p className="mb-6 text-sm text-green-600 dark:text-green-500">{fileName} has been added to your library.</p>

            <div className="flex gap-4">
              <button onClick={() => setStatus('idle')} className="text-sm font-medium text-green-700 hover:underline dark:text-green-400">
                Upload Another
              </button>
              <Link href="/" className="rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700">
                View Library
              </Link>
            </div>
          </div>
        )}
      </div>
      <MobileNav />
    </main>
  );
}
