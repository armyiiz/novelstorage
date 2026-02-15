"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Upload, Search, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/90 pb-safe pt-2 backdrop-blur-lg dark:border-slate-800 dark:bg-black/90 md:hidden">
      <div className="flex items-center justify-around px-4 pb-4">
        <NavLink href="/" icon={Home} label="Library" isActive={pathname === "/"} />
        <NavLink href="/search" icon={Search} label="Search" isActive={pathname === "/search"} />
        <NavLink href="/upload" icon={Upload} label="Upload" isActive={pathname === "/upload"} />
        <NavLink href="/profile" icon={User} label="Profile" isActive={pathname === "/profile"} />
      </div>
    </nav>
  );
}

function NavLink({ href, icon: Icon, label, isActive }: { href: string; icon: LucideIcon; label: string; isActive: boolean }) {
  return (
    <Link href={href} className={cn("flex flex-col items-center gap-1 p-2 transition-colors", isActive ? "text-midnight-blue dark:text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}>
      <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
