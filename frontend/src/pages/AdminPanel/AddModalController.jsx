import { useState } from "react";
import AddBookModal from "./AddModal";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const AddModalController = ({ isOpen, onClose, book,  }) => {

const [errorMessage, setErrorMessage] = useState([]);
  const handleAdd = async (newBook) => {
  try {
     console.log('Sending book data:', newBook); // Add this line to debug
     await axios.post(
    `${API_URL}/books`,
    {
      author:newBook.author,
      title:newBook.title,
      isbn:newBook.isbn,
      published_date:newBook.published_date,
      cover_url:newBook.cover_url,
      description:newBook.description,
      language:newBook.language
    },
    { withCredentials: true } 
  );
  onClose();
  window.location.reload();
} catch (error) {
 const errors = error.response?.data?.errors;
      setErrorMessage(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Registration failed")
      );
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
}
  };
  return (
    <AddBookModal
      isOpen={isOpen}
      onClose={onClose}
      book={book}
      onSave={handleAdd}
      errorMessage={errorMessage}
    />
  );
};

export default AddModalController;
