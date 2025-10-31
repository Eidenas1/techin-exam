

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import DeleteModalController from "../../pages/AdminPanel/DeleteModalController";
const BooksCardAdmin = ({ book }) => {
  const [showDelete, setShowDelete] = useState(false);
  const openDeleteModal = () => {
    setShowDelete(true);
  }
    return (
      <div className="w-max">
        <motion.div
          className={`text-center p-8 border-black flex flex-col gap-2 `}
        >
          <div className="gap-2 flex flex-col">
            <div className="flex gap-4 flex-col w-max">
            <h1>Title: {book.title}</h1>
            <h2>Author: {book.author} </h2>
            <h3>Language: {book.language}</h3>
            <button
              className="rounded-lg border-2 w-max self-center text-xl cursor-pointer inline-block font-medium leading-5 m-0 px-1 py-1 text-center transition-all duration-200"
              onClick={openDeleteModal}
            >
              Delete
            </button>

      {showDelete && (
        <DeleteModalController
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          book={book}
        />
      )}
            </div>
          </div>
            
        </motion.div>
      </div>

  );
};

export default BooksCardAdmin;
