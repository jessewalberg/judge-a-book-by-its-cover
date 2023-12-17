"use client";
import { useAppContext } from "@/providers/app-context";
import { BookType } from "../types";
import { useEffect, useState } from "react";
import Book from "../../components/book";
import DownvoteButton from "../../components/downvote-button";
import UpvoteButton from "../../components/upvote-button";
import LoadingSpinner from "../../components/loading-spinner";
import { downvote, upvote } from "./actions";
import { useRouter } from "next/navigation";

const Game: React.FC = () => {
  const router = useRouter();
  const { books, removeBook, loading } = useAppContext();

  const [book, setBook] = useState<BookType>();
  const [isLoading, setIsLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const localStorageBooks =
    typeof window !== "undefined" ? localStorage.getItem("books") : false;

  if (
    (!localStorageBooks || localStorageBooks === "undefined") &&
    typeof window !== "undefined"
  ) {
    localStorage.setItem("books", JSON.stringify([]));
  }
  const getRandomBook = () => {
    if (!books) return;
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };

  useEffect(() => {
    if (initialRender) {
      if (!books) return;
      const randomIndex = Math.floor(Math.random() * books.length);
      setBook(books[randomIndex]);
    }
    setInitialRender(false);
  }, [initialRender, books]);

  useEffect(() => {
    if (!book) return;
    const localStorageBooks = localStorage.getItem("books");
    if (!localStorageBooks) return;
    const parsedBooks = JSON.parse(localStorageBooks);
    if (parsedBooks.includes(book.id)) {
      return router.push(`/game/stats?bookId=${book.id}`);
    }
  }, [book, router]);
  const downvoteButtonText = "Bad";
  const upvoteButtonText = "Good";

  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };
  const handleGoodClick = async () => {
    if (!book) return;
    setIsLoading(true);
    await upvote(book.id);
    const currentBookId = book.id;
    const chosenBook = getRandomBook();
    const localBooks = localStorage.getItem("books");
    if (localBooks) {
      const parsedBooks = JSON.parse(localBooks);
      if (!parsedBooks.includes(currentBookId)) {
        parsedBooks.push(currentBookId);
        localStorage.setItem("books", JSON.stringify(parsedBooks));
      }
    }

    router.push(`/game/stats?bookId=${currentBookId}`);
    removeBook(currentBookId);
    setBook(chosenBook);
    setIsLoading(false);
  };

  const handleBadClick = async () => {
    if (!book) return;
    setIsLoading(true);
    await downvote(book.id);
    const currentBookId = book.id;
    const chosenBook = getRandomBook();
    const localBooks = localStorage.getItem("books");
    if (localBooks) {
      const parsedBooks = JSON.parse(localBooks);
      if (!parsedBooks.includes(currentBookId)) {
        parsedBooks.push(currentBookId);
        localStorage.setItem("books", JSON.stringify(parsedBooks));
      }
    }
    router.push(`/game/stats?bookId=${currentBookId}`);
    setBook(chosenBook);
    removeBook(currentBookId);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-6 w-full h-full">
      {book && !isEmpty(book) && <Book book={book} />}
      <div className="flex justify-around w-full md:w-3/4 mb-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <UpvoteButton text={upvoteButtonText} buttonClick={handleGoodClick} />
        )}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DownvoteButton
            text={downvoteButtonText}
            handleBadClicked={handleBadClick}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
