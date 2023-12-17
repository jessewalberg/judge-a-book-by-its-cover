"use server";

import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { BookType } from "../types";

export async function getNextSetOfBooks(previouslySelectedIds: number[]) {
  let randomRows;
  if (previouslySelectedIds.length > 0) {
    randomRows = await prisma.$queryRaw`
  SELECT * FROM "books"
  WHERE "id" NOT IN (${Prisma.join(previouslySelectedIds)})
  ORDER BY RANDOM() LIMIT 10
`;
  } else {
    randomRows = await prisma.$queryRaw`
  SELECT * FROM "books"
  ORDER BY RANDOM() LIMIT 10
`;
  }
  return randomRows as BookType[];
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
