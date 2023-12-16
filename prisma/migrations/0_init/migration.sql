-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "published_date" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "upvotes" BIGINT DEFAULT 0,
    "downvotes" BIGINT DEFAULT 0,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookserror" (
    "id" SERIAL NOT NULL,
    "bookid" TEXT,

    CONSTRAINT "bookserror_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notfound" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "notfound_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookserror_bookid_key" ON "bookserror"("bookid");

