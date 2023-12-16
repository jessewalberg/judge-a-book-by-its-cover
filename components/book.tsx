import Image from "next/image";

const Book: React.FC<any> = ({ book }) => {
  return (
    <div className="flex flex-col gap-y-4 items-center mt-4">
      <h1 className="md:text-3xl font-bold line-clamp-1">{book.title}</h1>
      <Image src={book.thumbnail} alt="book image" height={400} width={200} />
      <h2 className="text-md font-bold">by: {book.authors}</h2>
    </div>
  );
};
export default Book;
