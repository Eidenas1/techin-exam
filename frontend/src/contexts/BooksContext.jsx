import { useState, useEffect } from "react";
import { getData } from "../services/get";
import { BooksContext } from "./contexts";

export const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getData("books");
        setBooks(data.books);
        setAllBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <BooksContext value={{ books, setBooks, allBooks, setAllBooks}}>
      {children}
    </BooksContext>
  );
};


