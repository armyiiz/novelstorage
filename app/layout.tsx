import type { Metadata } from "next";
import { Sarabun, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personal E-Library",
  description: "Your personal library and reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} ${notoSerifThai.variable}`}>
      <body className="font-sans antialiased bg-soft-paper text-slate-900 dark:bg-black dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
