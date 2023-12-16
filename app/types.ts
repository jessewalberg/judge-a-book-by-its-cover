export type BookType = {
  id: number;
  title: string;
  authors: string;
  publisher: string;
  published_date: string;
  categories: string;
  thumbnail: string;
  upvotes: bigint | null;
  downvotes: bigint | null;
};
