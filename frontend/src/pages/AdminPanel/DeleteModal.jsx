const ModifyBookModal = ({ isOpen, onClose, onConfirm }) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="rounded  p-8 relative w-1/3 shadow-2xl bg-white text-center flex gap-8 flex-col max-md:w-9/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl text-[#4E3524]">
          ×
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-[#4E3524]">Are you sure you want to delete this book?</h2>
        <div className="flex justify-center gap-16">
            <button onClick={onConfirm} className=" rounded-2xl border-2 border-[#4E3524] h-2/16 w-3/16 text-[1.75rem] justify-center max-xl:text-[1.25rem] max-xl:h-3/16">
              Yes
            </button>
            <button onClick={onClose} className=" rounded-2xl border-2 border-[#4E3524] h-2/16 w-3/16 text-[1.75rem] justify-center max-xl:text-[1.25rem] max-xl:h-3/16">
               No
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyBookModal;
