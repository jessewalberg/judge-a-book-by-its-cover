"use client";
import { BookType } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookById } from "../actions";
import LoadingSpinner from "@/components/loading-spinner";

const Stats: React.FC<any> = () => {
  const [book, setBook] = useState<BookType>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await getBookById(Number(bookId));
        if (!response) return;
        setBook(response);
      } catch (error) {
        console.error("Error getting book by id: ", error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [bookId]);

  if (loading) return <LoadingSpinner />;
  if (!book) return <h2>Couldnt find the book!</h2>;
  const upvotes = Number(book.upvotes);
  const downvotes = Number(book.downvotes);
  const upvotePercentage = Math.round((upvotes / (upvotes + downvotes)) * 100);
  const downvotePercentage = Math.round(
    (downvotes / (upvotes + downvotes)) * 100
  );
  return (
    <section className="flex flex-col justify-center items-center h-full gap-y-6">
      <h2 className="font-bold text-xl">{book.title}</h2>
      <div>
        <p>
          Percentage of people who Up voted:{" "}
          {isNaN(upvotePercentage) ? 0 : upvotePercentage}%
        </p>
        <p>
          Percentage of people who Down voted:{" "}
          {isNaN(downvotePercentage) ? 0 : downvotePercentage}%
        </p>
        <p>Total Up votes: {String(upvotes)}</p>
        <p>Total Down votes: {String(downvotes)}</p>
      </div>
      <button
        className="bg-primary-orange text-white px-4 py-2 rounded-md font-bold"
        onClick={() => router.push("/game")}
      >
        Next Book
      </button>
    </section>
  );
};

export default Stats;
