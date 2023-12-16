"use client";
import { getBooks, getNextSetOfBooks } from "@/app/game/actions";
import { BookType } from "@/app/types";
import React, { createContext, useState, useContext, useEffect } from "react";

type ContextType = {
  books: BookType[] | undefined;
  removeBook: (bookId: number) => void;
  loading: boolean;
};
const AppContext = createContext<ContextType>({
  books: [],
  removeBook: () => {},
  loading: true,
});

export const AppProvider = ({ children }: any) => {
  const [books, setBooks] = useState<BookType[]>();
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  const removeBook = (bookId: number) => {
    if (!books) return;
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };
  const value = {
    books,
    loading,
    removeBook,
  };

  useEffect(() => {
    if (initialRender) {
      const fetchBooks = async () => {
        try {
          const response = await getBooks();
          setBooks(response);
        } catch (error) {
          console.error("Error fetching books", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
    setInitialRender(false);
  }, [initialRender]);

  useEffect(() => {
    if (books && books.length === 0 && !initialRender) {
      setLoading(true);
      const fetchBooks = async () => {
        try {
          const response = await getNextSetOfBooks();
          setBooks(response);
        } catch (error) {
          console.error("Error fetching books", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  }, [books, initialRender]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
