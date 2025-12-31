import { ListAPI } from "../../api/ListAPI";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ListWrapper from "../../components/Common/ListWrapper";

export default function ApprovedNotices() {

    const { 
    data: notices,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = ListAPI("/nphs/notices/approved/");    

  return (
  <section className="py-5 px-4 sm:px-8 md:px-20 bg-sky-50 min-h-screen">
  <ListWrapper title="Approved Notices" data={notices} loading={loading} error={error} >

      {/* Notices Section */}
      <div className="space-y-3">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.slug}
              className="max-w-3xl mx-auto bg-slate-100 border border-blue-950 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition p-3 sm:p-2 flex flex-col justify-between"
            >
              {/* Notice Header */}
             
          <div className="flex justify-between items-start border-b border-blue-950 pb-1 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-blue-950 truncate">
              {notice.title}
            </h3>
            <span className="text-xs sm:text-sm text-blue-950 opacity-70 whitespace-nowrap">
              {new Date(notice.notice_for_date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

               <p className="text-xs sm:text-sm text-blue-950 opacity-80 line-clamp-1 mb-3">
                {notice.description}....
              </p>

              {/* See More Button */}
              <div className="text-right mt-auto">
               <Link
              to={`/notices/${notice.id}`}
              state={{ from: "approved" }}   // ✅ pass state
              className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Details →
            </Link>

              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-950 text-center font-medium text-base sm:text-lg">
            Currently, there are no approved notices
          </p>
        )}
      </div>
  </ListWrapper>

<div className="mt-auto">
<Pagination
page={page}
next={next}
previous={previous}
onPageChange={setPage}/>
    </div>
    </section>
  );
}
