export default function Pagination({
  page,
  next,
  previous,
  onPageChange,
}) {
  return (
    <div className="sticky bottom-0 w-full">
      <div className="flex justify-center items-center gap-6 py-4">
        <button
          type="button"
          disabled={!previous}
          onClick={() => onPageChange(page - 1)}
          className={`px-5 py-2 rounded-lg font-semibold transition
            ${
              previous
                ? "bg-blue-900 text-white hover:bg-blue-950"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-semibold">
          Page {page}
        </span>

        <button
          type="button"
          disabled={!next}
          onClick={() => onPageChange(page + 1)}
          className={`px-5 py-2 rounded-lg font-semibold transition
            ${
              next
                ? "bg-blue-900 text-white hover:bg-blue-950"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
