import { div } from "framer-motion/client";
import Loading from "../Loading";
import Pagination from "../Pagination";

export default function ListWrapper({ title, data, loading, error, children}) {
  return (
    
    <section className="bg-sky-50 py-10 px-4 mt-10 min-h-screen">
      <div>
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-lg sm:text-xl text-center bg-blue-950 text-white py-3 rounded-xl font-bold">
          {title}
        </h1>

        {loading ? (
          <Loading message={`Loading ${title}`} />
        ) : error ? (
          <p className="text-center text-red-500">Failed to load {title}.</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="space-y-6">{children}</div>
        )}
      </div>
      </div>
      {/* <div className="mt-auto">
      <Pagination
      page={page}
      next={next}
      previous={previous}
      onPageChange={setPage}/>
      </div> */}
    </section>
  );
}
