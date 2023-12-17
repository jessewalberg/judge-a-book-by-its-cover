import StartTitle from "@/components/start-title";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <StartTitle />
      <div className="flex justify-around w-full md:w-3/4">
        <Link
          className="bg-primary-blue px-6 py-2 text-white font-bold rounded w-32 text-center"
          href="/game"
        >
          Play
        </Link>
        <Link
          className="bg-primary-pink px-6 py-2 text-white font-bold rounded w-32 text-center"
          href="/game/not-playing"
        >
          Dont Play
        </Link>
      </div>
    </>
  );
}
