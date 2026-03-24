import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JET Restaurant Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
