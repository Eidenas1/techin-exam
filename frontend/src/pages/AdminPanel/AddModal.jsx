import { useForm } from "react-hook-form";
const AddBookModal = ({ isOpen, onClose, onSave, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="rounded bg-white p-8 relative w-1/3 shadow-2xl text-center flex gap-8 flex-col max-md:w-9/10 max-h-9/10 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl">
          ×
        </button>
        <h2 className="text-3xl font-semibold text-[#4E3524] mb-6">Add Book</h2>
         <pre className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">
              {errorMessage}
            </pre>
        <form
          onSubmit={handleSubmit(onSave)}
          className="flex flex-col gap-12 items-center"
        >
          <input type="hidden" {...register("id")} />
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Book Title"
            className="border-2 rounded-2xl border-[#4E3524] h-2/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.title && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.title.message}</p>
          )}
          <input
            {...register("author", { required: "Author is required" })}
            placeholder="Author"
            className="border-2 rounded-2xl border-[#4E3524] h-2/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.author && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.author.message}</p>
          )}
           
           <input
            {...register("isbn", {
              required: "ISBN is required",
            })}
            placeholder="ISBN"
            className="border-2 border-[#4E3524] rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.isbn && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.isbn.message}</p>
          )}
           <input
            {...register("published_date", {
              required: "Published Date is required",
            })}
            placeholder="Published Date"
            className="border-2  border-[#4E3524] rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.published_date && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.published_date.message}</p>
          )}
          <input
            {...register("cover_url", {
              required: "Cover URL is required",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                message:
                  "Please enter a valid image URL (png, jpg, jpeg, gif, webp, svg)",
              },
            })}
            placeholder="Cover URL"
            className="border-2 border-[#4E3524] rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.cover_url && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.cover_url.message}</p>
          )}
          <input
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="border-2 border-[#4E3524] rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.description && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.description.message}</p>
          )}
          <input
            {...register("language", {
              required: "Language is required",
            })}
            placeholder="Language"
            className="border-2 border-[#4E3524] rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.language && (
            <p className="text-[1.05rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">{errors.language.message}</p>
          )}
          <button
            type="submit"
            className="bg-[var(--lighter-background-color)] border-[#4E3524] text-[#4E3524] rounded-2xl border-2 h-3/16/16 w-4/16 text-[1.75rem] justify-center max-xl:text-[1.25rem] max-xl:h-3/16"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
