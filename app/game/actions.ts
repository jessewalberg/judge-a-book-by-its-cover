"use server";

import { prisma } from "@/prisma/db";

let skipCount: number;

export async function getBooks() {
  const books = await prisma.books.findMany({ take: 10 });
  skipCount = 10;
  return books;
}

export async function getNextSetOfBooks() {
  const books = await prisma.books.findMany({ skip: skipCount, take: 10 });
  console.log(skipCount);
  skipCount += 10;
  return books;
}

export async function upvote(id: number) {
  const book = await prisma.books.update({
    where: { id },
    data: { upvotes: { increment: 1 } },
  });
  return book;
}

export async function downvote(id: number) {
  const book = await prisma.books.update({
    where: { id },
    data: { downvotes: { increment: 1 } },
  });
  return book;
}

export async function getBookById(id: number) {
  const book = await prisma.books.findUnique({ where: { id } });
  return book;
}
