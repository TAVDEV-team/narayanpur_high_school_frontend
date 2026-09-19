import { useMemo } from "react";
import { ListAPI } from "../../api/ListAPI";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

export default function ApprovedNotices() {
  const 
  {
    data: notices,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = ListAPI("/nphs/notices/approved/");


 {/*month old notice goes to prev section*/}

  const { recentNotices, previousNotices } = useMemo(() => {
    const recent = [];
    const previous = [];

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    notices.forEach((notice) => {
      const noticeDate = new Date(notice.notice_for_date);
      (noticeDate >= oneMonthAgo ? recent : previous).push(notice);
    });

    return { recentNotices: recent, previousNotices: previous };
  }, [notices]);


  {/*layout used for both recent and prev*/}


  const renderCard = (notice) => (
    <div
      key={notice.slug}
      className="max-w-3xl mx-auto bg-slate-100 border border-blue-950 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition p-3 sm:p-4 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start border-b border-blue-950 pb-1 mb-2">
        
        <h3 className="min-w-0 flex-1 text-base sm:text-lg font-semibold text-blue-950 truncate">
          {notice.title}
        </h3>
        
        {/* formating data in d/m/y format*/}
        <span className="text-xs sm:text-sm text-blue-950 opacity-70 whitespace-nowrap">
          {new Date(notice.notice_for_date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>

      </div>

      {/*notice headline*/}
      <p className="text-xs sm:text-sm text-blue-950 opacity-80 line-clamp-1 mb-3">
        {notice.description}....
      </p>

      {/* See More Button */}
      <div className="text-right mt-auto">

        <Link
          to={`/notices/${notice.id}`}
          state={{ from: "approved" }} // ✅ pass state
          className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
        >
          Details →
        </Link>

      </div>

    </div>
  );


  {/*page layout*/}


  return (
    <section className="py-5 px-4 sm:px-8 md:px-20 bg-sky-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">



        {/* recent notices box */}


        <div>

          <h1 className="text-lg sm:text-xl text-center bg-blue-950 text-white py-3 rounded-xl font-bold mb-6">
            Recent Notices
          </h1>

          {loading ? (
            <Loading message="Loading notices" />
          ) : error ? (
            
            <p className="text-center text-red-500">
              Failed to load notices.
            </p>

          ) : recentNotices.length > 0 ? (

            <div className="space-y-3">
              {recentNotices.map(renderCard)}
            </div>
          ) : (

            <p className="text-blue-950 text-center font-medium text-base sm:text-lg">
              No recent notices.  
            </p> /*when no recent notices*/

          )}

        </div>


        {/* prev notices box */}


        {!loading && !error && previousNotices.length > 0 && (
          <div>

            <h2 className="text-lg sm:text-xl text-center bg-slate-600 text-white py-3 rounded-xl font-bold mb-6">
              Previous Notices
            </h2>

            <div className="space-y-3">
              {previousNotices.map(renderCard)}
            </div>

          </div>
        )}

      </div>

      <div className="mt-6">
      <Pagination 
      page={page} 
      next={next} 
      previous={previous} 
      onPageChange={setPage} />

      </div>

    </section>
  );
}
