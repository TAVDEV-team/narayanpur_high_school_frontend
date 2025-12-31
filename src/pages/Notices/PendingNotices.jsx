import { Link } from "react-router-dom";
import { ListAPI } from "../../api/ListAPI";
import Pagination from "../../components/Pagination";
import ListWrapper from "../../components/Common/ListWrapper";
import API from "../../api/api";
import { useState } from "react";

export default function PendingNotices() {
  const {
    data: notices,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
    setData,
  } = ListAPI("/nphs/notices/pending/");

  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const approveNotice = async (id) => {
    try {
      await API.get(`/nphs/notices/${id}/approve/`);
      setData((prev) => prev.filter((n) => n.id !== id));
      showMessage("Notice approved successfully ✅");
    } catch (err) {
      console.error("Approval failed:", err.response || err);
      showMessage("Approval failed ❌");
    }
  };

  return (
    <section className="py-5 px-4 sm:px-8 md:px-20 bg-sky-50 min-h-screen">
      {/* Message */}
      {message && (
        <div className="p-3 mb-4 rounded bg-green-100 text-green-800 text-center text-sm max-w-2xl mx-auto">
          {message}
        </div>
      )}

      <ListWrapper
        title="Pending Notices Review"
        subtitle="Please approve the pending notices."
        data={notices}
        loading={loading}
        error={error}
      >
        <div className="space-y-3">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="max-w-3xl mx-auto bg-slate-100 border border-blue-950 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition p-3 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-blue-950 pb-1 mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-950 truncate">
                    {notice.title}
                  </h3>
                  <span className="text-xs sm:text-sm text-blue-950 opacity-70 whitespace-nowrap">
                    {new Date(notice.notice_for_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-blue-950 opacity-80 line-clamp-1 mb-3">
                  {notice.description}...
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center gap-2 mt-auto">
                  <Link
                    to={`/notices/${notice.id}`}
                    state={{ from: "pending" }}
                    className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    Details →
                  </Link>

                  <button
                    onClick={() => approveNotice(notice.id)}
                    className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-blue-950 text-center font-medium text-base sm:text-lg">
              No pending notices at the moment. All caught up!
            </p>
          )}
        </div>
      </ListWrapper>

      <div className="mt-auto">
        <Pagination
          page={page}
          next={next}
          previous={previous}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
