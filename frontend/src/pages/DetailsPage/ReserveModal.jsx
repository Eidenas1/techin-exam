import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/contexts";
const API_URL = import.meta.env.VITE_API_URL;

const ReserveModal = ({ isOpen, onClose, book_id }) => {
 const { user } = useContext(UserContext);
console.log("User from context:", user);
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log({ book_id, user, date });
    if (!date || !book_id) {
      setErrorMessage("Missing date or book info");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/books/reserve`,
        {
          book_id,
          reserved_date: date,
          user_id: user.id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        setDate("");
        setErrorMessage("");
        onClose();
      } else {
        setErrorMessage(response.data.message || "Reservation failed");
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      setErrorMessage(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Reserve failed")
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center max-lg:p-4 bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs">
      <div className="bg-white p-8 rounded-lg min-w-[300px] shadow-lg flex flex-col">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-[#4E3524] mb-4 text-center">Reserve Book</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
          <label htmlFor="reserve-date" className="text-lg font-medium text-white">Pick a date:</label>
          <input
            type="date"
            id="reserve-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 bg-white text-black"
          />
          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="mt-4 bg-white border-2 border-[#4E3S24] text-black py-2 px-4 rounded-md  transition-colors"
          >
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserveModal;
