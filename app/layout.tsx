import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono, Domine } from 'next/font/google'

export const metadata: Metadata = {
  title: "JET Restaurant Finder",
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist'
})

const geist_mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

const domine = Domine({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-domine'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.className} ${geist.variable} ${geist_mono.variable} ${domine.variable} bg-surface text-ink`}
    >
      <body>{children}</body>
    </html>
  );
}
