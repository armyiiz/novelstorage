"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Upload, Search, User, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Library" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/upload", icon: Upload, label: "Upload" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Desktop Navigation (Top Bar) */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-midnight-blue dark:text-white">
            <BookOpen className="h-6 w-6 text-bookmark-gold" />
            <span>NovelStorage</span>
          </Link>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-bookmark-gold",
                  pathname === item.href ? "text-midnight-blue dark:text-white" : "text-slate-500 dark:text-slate-400"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 pb-safe pt-2 backdrop-blur-lg dark:border-slate-800 dark:bg-black/90">
        <div className="flex items-center justify-around px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                pathname === item.href ? "text-midnight-blue dark:text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              <item.icon className="h-6 w-6" strokeWidth={pathname === item.href ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
