import PlausibleProvider from "next-plausible";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { AppProvider } from "@/providers/app-context";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Judge a Book by its Cover",
  description: "A game to judge books based on their covers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PlausibleProvider domain="judgeabookbyitscover.app">
        <AppProvider>
          <body className={inter.className}>
            <main className="bg-hero-pattern bg-no-repeat bg-cover h-screen w-screen flex flex-col">
              <header className="transparent">
                <nav>
                  <ul className="flex items-center justify-center bg-transparent p-2">
                    <li className="font-bold md:text-xl">
                      I have nothing to put here for now so hangout with this
                      suspicious book
                    </li>
                    <li>
                      <Link href="/">
                        <Image
                          src="/bookie-logo.png"
                          width={75}
                          height={100}
                          alt="an angry book"
                        />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </header>
              <section className="flex-grow flex flex-col justify-center items-center">
                <div className="bg-primary-off-white-90-percent flex flex-col justify-center items-center w-full md:w-1/2 md:max-w-1/2 py-6">
                  {children}
                </div>
              </section>
            </main>
          </body>
        </AppProvider>
      </PlausibleProvider>
    </html>
  );
}
