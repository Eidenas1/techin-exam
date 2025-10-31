import DeleteBookModal from "./DeleteModal";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const DeleteModalController = ({ isOpen, onClose, book }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/books/${book.book_id}`, {
        withCredentials: true,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Delete Failed: ", error.message);
    }
  };

  return (
    <DeleteBookModal
      onConfirm={handleDelete}
      isOpen={isOpen}
      onClose={onClose}
      book={book}
    />
  );
};

export default DeleteModalController;
