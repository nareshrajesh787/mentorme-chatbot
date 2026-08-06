import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MentorMe Information Assistant",
  description:
    "A grounded information assistant prototype using approved information from MentorMe North Georgia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
