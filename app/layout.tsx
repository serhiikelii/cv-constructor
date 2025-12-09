import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Constructor",
  description: "Professional Resume Builder",
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
