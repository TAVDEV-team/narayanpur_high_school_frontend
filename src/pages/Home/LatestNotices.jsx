import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import Loading from "../../components/Loading";
import CardHeader from "../../components/Titles/CardHeads";
import { ListAPI } from "../../api/ListAPI";

export default function LatestNotices() {
  const {
    data: notices,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
    setData,
  } = ListAPI("/nphs/notices/approved/");

  return (
    <section className="py-12 px-4 sm:px-6 md:px-20 ">
      <div className="max-w-7xl mx-auto">

      <CardHeader
      text={"Latest Notices"}
      />
        {loading ? (
          <Loading
          message="Loading"
          />
        ) : notices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map((notice) => (
              <div
                key={notice.slug}
                className="bg-blue-50 border border-blue-400 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-black to-blue-950 text-white">
                  <Bell className="w-5 h-5" />
                  <h3 className="font-semibold text-base sm:text-lg truncate">
                    {notice.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm sm:text-base opacity-90 line-clamp-3 mb-3">
                    {notice.description}...
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(notice.notice_for_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  {/* Details Button */}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-black border border-blue-950 rounded-2xl shadow-lg p-6 text-center">
            <p className="text-blue-800 font-semibold text-lg">
              📌 No approved notices available
            </p>
          </div>
        )}

        {/* View More Button */}
        {notices.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/notice-approved"
              className="inline-block bg-gradient-to-r from-black to-blue-950 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              View More →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
