import "./DetailsPage.scss";
import Nav from "../../components/Nav/Nav";
import { useContext, useState } from "react";
import axios from "axios";
import { BooksContext } from "../../contexts/contexts";
import { useParams } from "react-router";
import { CircleLoader } from "react-spinners";
import ReserveModalController from "./ReserveModalController";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const DetailsPage = () => {
  const { id } = useParams();
  const { books } = useContext(BooksContext);
  const [showAuth, setShowAuth] = useState(false);
  const [showReserve, setShowReserve] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [reviews, setReviews] = useState([]);

   useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get(`${API_URL}/books/${id}/reviews`);
        setReviews(res.data);
      } catch (err) {
        setReviews([]);
      }
    }
    fetchReviews();
  }, [id, showReviewModal, reviewStatus]);

  const openAuth = (type) => {
    setShowAuth(true);
    setShowReserve(type === "reserve");
  };
  const closeReserve = () => {
    setShowReserve(false);
  };
  const handleReviewSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}/books/${id}/reviews`, {
        review: reviewText,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        setReviewStatus("Review submitted!");
        setShowReviewModal(false);
        setReviewText("");
      } else {
        setReviewStatus("Failed to submit review.");
      }
    } catch (err) {
      setReviewStatus("Error submitting review.");
    }
  };


  if (!books || books.length === 0) {
    return <div className="flex h-[200dvh] items-center justify-center"></div>;
  }
  const book = books.find((book) => book.book_id === Number(id));
  const flags = {
    en: "https://flagcdn.com/gb.svg",
    fr: "https://flagcdn.com/fr.svg",
    es: "https://flagcdn.com/es.svg",
  };
  return (
    <div className="flex h-[200dvh]">
      <div className="z-10 w-full h-full flex">
        <div className="w-1/12 shadow-[inset_0_0_2rem_rgba(0,0,0,0.9)] bg-[#4E3524] max-md:hidden"></div>
        <Nav />
        <div className="shadow-[inset_0_0_4rem_rgba(0,0,0,0.9)] blob blob-reverse mx-auto flex aspect-[9/16] flex-col max-md:justify-start max-h-[full] w-3/4 items-start overflow-hidden bg-[#4E3524] p-16 py-16 transition-[background] before:absolute before:top-[25%] before:left-[75%] before:z-0 before:h-[20%] before:w-[20%] before:origin-[60%] before:rounded-[30rem] before:bg-gradient-to-br before:from-[#161010] before:via-[#382121] before:to-[#763636] before:blur-[85px] before:brightness-150 after:absolute after:top-[25%] after:left-[20%] after:z-0 after:h-[20%] after:w-[20%] after:origin-[60%] after:rounded-[30rem] after:bg-gradient-to-br after:from-[#763636] after:via-[#382121] after:to-[#161010] after:blur-[85px] after:brightness-150 max-md:before:h-[35%] max-md:before:w-[100%] max-md:after:h-[35%] max-md:after:w-[100%] max-md:before:rounded-2xl max-md:after:rounded-2xl max-md:before:top-[5%] max-md:after-top-[5%] max-md:w-full max-md:h-[675dvh]">
          <div className="flex z-20 w-full h-full gap-16 flex-col max-md:flex-row bg-[#d6d2bc] border-8 border-[#3a271b] shadow-[inset_0_0_2rem_rgba(0,0,0,0.9)] p-12">
            {imgLoading && (
              <div className="w-full h-full flex justify-center p-32">
                <CircleLoader color="#4E3524" size={45} />
              </div>
            )}
            <div
              className={`border-6 border-[#3a271b] flex flex-col gap-12 p-14 w-full h-full  ${
                imgLoading ? "invisible" : "visible"
              }`}
            >
              <div className="w-full gap-16 max-md:flex-col justify-between flex">
                <div className="w-1/3 border-4 border-[#3a271b]">
                  <img
                    src={book.cover_url}
                    alt="Book Cover"
                    className="w-full h-full"
                    onLoad={() => setImgLoading(false)}
                  />
                </div>
                <div className="w-1/3 gap-6 flex flex-col text-xl text-center justify-center font-semibold text-[#4E3524]">
                  <p>Title: {book.title}</p>
                  <p>Author: {book.author}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>
                    Published Date: <br /> {book.published_date}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span>Language:</span>
                    {flags[book.language] && (
                      <img
                        src={flags[book.language]}
                        alt={`${book.language} flag`}
                        className="max-w-8 max-h-10"
                      />
                    )}
                  </div>
                </div>

                <div className="w-1/3 flex flex-col justify-center items-center font-bold gap-16 text-[#4E3524] ">
                  <button className=" w-full p-4 border-2  border-[#3a271b] rounded-2xl cursor-pointer" onClick={() => {
                    openAuth("reserve")
                  }}>
                    RESERVE
                  </button>
                </div>
              </div>
              <div className="w-full gap-8 justify-center items-center text-bold text-4xl text-[#4E3524] flex">
                <hr className="w-1/4" /> <h1>Description</h1>{" "}
                <hr className="w-1/4" />
              </div>
              <div className="h-full w-full flex text-lg">
                <h1>{book.description}</h1>
              </div>
              <div className="h-1/3 flex flex-col gap-6">
                <div className="w-full gap-8 justify-center items-center text-bold text-4xl text-[#4E3524] flex">
                  <hr className="w-1/4" />
                  <h1>Reviews ({reviews.length})</h1>
                  <hr className="w-1/4" />
                </div>
                <div className="h-full w-full flex flex-col text-center gap-4">
                  <button
                    className="self-center p-2 border-1 border-[#3a271b] rounded-xl text-xs cursor-pointer"
                    onClick={() => setShowReviewModal(true)}
                  >
                    WRITE A REVIEW
                  </button>
                  {reviewStatus && (
                    <div style={{ color: "#4E3524", marginTop: 8 }}>{reviewStatus}</div>
                  )}

                  {reviews.length === 0 ? (
                    <div className="text-[#4E3524] text-sm">No reviews yet.</div>
                  ) : (
                    <div className="flex flex-col gap-4 mt-4">
                      {reviews.map((r, idx) => (
                        <div key={idx} className="border border-[#3a271b] rounded-lg p-4 bg-transparent shadow-md text-left flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#4E3524]">{r.email}</span>
                            <span className=" text-xs">{new Date(r.created_at).toLocaleString()}</span>
                          </div>
                          <div className="text-[#4E3524] text-base">{r.review}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
         {showAuth && (
            <ReserveModalController
              showReserve={showReserve}
              closeReserve={closeReserve}
              book_id={book.book_id}
            />
          )}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center max-lg:p-4 bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs">
          <div className="bg-white p-8 rounded-lg min-w-[300px] shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold text-[#4E3524] mb-4 text-center">Write a Review</h2>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows={5}
              className="w-full mb-4 p-2 border border-[#3a271b] rounded  "
              placeholder="Your review"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 text-[#4E3524] hover:bg-gray-400 transition"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-[#4E3524] text-white font-semibold hover:bg-[#3a271b] transition"
                onClick={handleReviewSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DetailsPage;
