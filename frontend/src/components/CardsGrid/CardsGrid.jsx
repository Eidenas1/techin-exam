import BooksCard from "../BooksCard/BooksCard";
import { BooksContext } from "../../contexts/contexts";
import { useContext } from "react";

const CardsGrid = () => {
  const { books, allBooks } = useContext(BooksContext);
  return (
    <section className="w-full grid grid-cols-[repeat(5,minmax(1rem,1fr))] gap-16 max-md:grid-cols-[repeat(1,minmax(1rem,1fr))]">
      {allBooks.length === 0 ? (
        <p className="text-center text-white">
          There are no available books to reserve, please check back later.
        </p>
      ) : books.length === 0 ? (
        <p className="text-center text-white">The book that you are searching is not found.</p>
      ) : (
        books.map((book) => <BooksCard key={book.id} book={book} />)
      )}
    </section>
  );
};

export default CardsGrid;
