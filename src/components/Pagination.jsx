export default function Pagination({
  page,
  next,
  previous,
  onPageChange,
}) {
  return (
    <div className="flex justify-center gap-4 mt-10">
      <button
        disabled={!previous}
        onClick={() => onPageChange(page - 1)}
        className={`px-5 py-2 rounded-lg font-semibold ${
          previous
            ? "bg-blue-900 text-white hover:bg-blue-950"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      <span className="px-4 py-2 text-gray-700 font-semibold">
        Page {page}
      </span>

      <button
        disabled={!next}
        onClick={() => onPageChange(page + 1)}
        className={`px-5 py-2 rounded-lg font-semibold ${
          next
            ? "bg-blue-900 text-white hover:bg-blue-950"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}
