import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWrapper from "./appWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BRA Roster Application",
  description: "Application for next season's roster for <Best Rapper Alive>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 light`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
