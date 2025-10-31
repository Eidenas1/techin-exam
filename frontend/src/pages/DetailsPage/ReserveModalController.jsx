import ReserveModal from './ReserveModal'

const ReserveModalController = ({
  showReserve,
  closeReserve,
  book_id
}) => {
  return (
    <>
      <ReserveModal
        isOpen={showReserve}
        onClose={closeReserve}
        book_id={book_id}
      />
    </>
  );
};

export default ReserveModalController;
