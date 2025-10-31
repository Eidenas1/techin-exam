

import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { CircleLoader } from "react-spinners";

const BooksCard = ({ book }) => {
  const [loading, setLoading] = useState(true);
  const flags = {
    en: "https://flagcdn.com/gb.svg",
    fr: "https://flagcdn.com/fr.svg",
    es: "https://flagcdn.com/es.svg",
  };
  const navigate = useNavigate();
    return (
      <div className="relative w-full">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent">
            <CircleLoader color="#d6d2bc" size={45} />
          </div>
        )}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`text-center flex flex-col gap-4 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onClick={() => navigate(`/${book.book_id}`)}
        >
          <div className="gap-2 flex flex-col">
            <div className="relative w-full aspect-[2/3] min-h-[8rem] overflow-hidden">
              <img
                src={book.cover_url}
                alt={book.title}
                className={`w-full h-full object-cover rounded ${loading ? 'invisible' : 'visible'}`}
                onLoad={() => setLoading(false)}
              />
              {flags[book.language] && !loading && (
                <img
                  src={flags[book.language]}
                  alt={`${book.language} flag`}
                  className="absolute top-0 left-0 max-w-8 max-h-10"
                />
              )}
            </div>
            {!loading && (
              <div>
                <h2 className="text-[#d6d2bc] text-base ">{book.author}</h2>
              </div>
            )}
          </div>
          {!loading && (
            <div>
              <h1 className="text-[#d6d2bc] text-xl font-semibold">
                {book.title}
              </h1>
            </div>
          )}
        </motion.div>
      </div>

  );
};

export default BooksCard;
