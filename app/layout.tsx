import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-poppins'
});

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
      <body className={poppins.className}
      >
        {children}
      </body>
    </html>
  );
}
