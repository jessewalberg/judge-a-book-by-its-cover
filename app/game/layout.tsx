import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Judge a Book by its Cover (Started)",
  description: "A game to judge books based on their covers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}
