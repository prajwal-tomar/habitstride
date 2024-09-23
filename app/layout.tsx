import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "HabitStride",
  description: "HabitStride helps you build and maintain healthy habits through daily check-ins and progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
