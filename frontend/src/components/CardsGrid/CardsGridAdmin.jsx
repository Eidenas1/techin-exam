import BooksCardAdmin from "../BooksCard/BooksCardAdmin";
import { BooksContext } from "../../contexts/contexts";
import { useContext } from "react";
import BooksCardAddAdmin from "../BooksCard/BooksCardAddAdmin";

const CardsGridAdmin = () => {
  const { books, allBooks } = useContext(BooksContext);
  return (
    <section className="w-full grid grid-cols-[repeat(5,minmax(1rem,1fr))] gap-16 max-md:grid-cols-[repeat(1,minmax(1rem,1fr))]">
      {allBooks.length === 0 ? (
        <p className="text-center text-white">
          There are no available books to reserve, create one.
        </p>
      ) : (
        books.map((book) => <BooksCardAdmin key={book.id} book={book} />)
      )}
      <BooksCardAddAdmin/>
    </section>
  );
};

export default CardsGridAdmin;
