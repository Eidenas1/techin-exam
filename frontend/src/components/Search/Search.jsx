import { useState, useContext } from "react";
import { BooksContext } from "../../contexts/contexts";

const Search = () => {

  const [query, setQuery] = useState("");
  const { allBooks, setBooks } = useContext(BooksContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const words = value.trim().toLowerCase().split(/\s+/);
    const filtered = allBooks.filter(book =>
      words.every(word =>
        book.title.toLowerCase().includes(word) ||
        book.author.toLowerCase().includes(word)
      )
    );
    setBooks(filtered);
  };

  return (
    <form className="h-max w-full flex" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        id="search"
        className="w-full h-[3.25rem] bg-[#d6d2bc] rounded-3xl px-8 shadow-[inset_0_0_0.35rem_rgba(0,0,0,0.9)] font-sans placeholder-root"
      />
    </form>
  );
};

export default Search;
