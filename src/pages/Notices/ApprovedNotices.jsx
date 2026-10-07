// src/pages/Notices/ApprovedNotices.jsx
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BellOff,
  BellRing,
  Calendar,
  History,
} from "lucide-react";
import { ListAPI } from "../../api/ListAPI";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

// Which field holds the date used to decide "new" or "previous"?
const getNoticeDate = (notice) => notice.notice_for_date;

// Serif font for headings.
const serif = "font-['Playfair_Display',Georgia,serif]";

// A notice counts as "new" if it was published within the last month.
function isRecent(dateValue) {
  const published = new Date(dateValue);
  if (Number.isNaN(published.getTime())) return false; // bad date: treat as old

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return published > oneMonthAgo;
}

// Example output: "Dec 24, 2025"
function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

// Newest first.
const byNewestDate = (a, b) =>
  new Date(getNoticeDate(b)) - new Date(getNoticeDate(a));

const noticeCount = (count) => `${count} ${count === 1 ? "notice" : "notices"}`;

// One notice inside a box.
function NoticeCard({ notice, isNew }) {
  return (
    <article className="rounded-[10px] border border-[#E3E7F2] bg-[#F7F8FC] p-3 sm:p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <h3 className="text-[15px] font-semibold leading-snug text-[#0A1F6B]">
          {isNew && (
            <span className="mr-2 inline-block rounded-full bg-[#FFF1C7] px-2 py-0.5 align-[2px] text-[10px] font-semibold tracking-wider text-[#7A5200]">
              NEW
            </span>
          )}
          {notice.title}
        </h3>

        <p className="flex shrink-0 items-center gap-1 text-xs text-[#5A6280] sm:mt-0.5">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          {formatDate(getNoticeDate(notice))}
        </p>
      </div>

      {/* One line only; long text is cut off with "..." */}
      <p className="mt-1.5 truncate text-sm text-[#4A5373]">
        {notice.description}
      </p>

      <div className="mt-2 flex justify-end">
        <Link
          to={`/notices/${notice.id}`}
          state={{ from: "approved" }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#00237A] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0A1F6B] sm:text-sm"
        >
          Details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

// The rounded box with a coloured header, used for both sections.
function NoticeBox({ icon: Icon, title, subtitle, count, headerColor, children }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-[#D5DBEE] bg-white">
      <div className={`flex items-center justify-between gap-3 px-4 py-3 ${headerColor}`}>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-[#F5C518]" aria-hidden="true" />
          <div>
            <h2 className={`${serif} text-base font-bold text-white sm:text-lg`}>
              {title}
            </h2>
            <p className="text-[11px] text-[#D6DCEF]">{subtitle}</p>
          </div>
        </div>

        <span className="whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
          {count}
        </span>
      </div>

      <div className="space-y-2.5 p-3 sm:p-4">{children}</div>
    </div>
  );
}

// Shown inside a box when it has no notices.
function EmptyMessage({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-[10px] border border-dashed border-[#C5CDE6] bg-[#F7F8FC] px-4 py-7 text-center">
      <Icon className="h-6 w-6 text-[#9A6B00]" aria-hidden="true" />
      <p className={`${serif} text-base font-bold text-[#0A1F6B]`}>{title}</p>
      <p className="text-xs text-[#5A6280]">{text}</p>
    </div>
  );
}

export default function ApprovedNotices() {
  // Fetch the approved notices (this also gives us the paging info).
  const { data: notices, loading, error, page, setPage, next, previous } =
    ListAPI("/nphs/notices/approved/");

  // Split the list into new and older notices, newest first.
  const newNotices = notices
    .filter((notice) => isRecent(getNoticeDate(notice)))
    .sort(byNewestDate);

  const previousNotices = notices
    .filter((notice) => !isRecent(getNoticeDate(notice)))
    .sort(byNewestDate);

  return (
    // pt-28 keeps the heading from hiding under the navbar.
    // Make it smaller (e.g. pt-20) if there is too much space on top.
    <section className="min-h-screen px-4 pb-10 pt-28 sm:px-8">
      <div className="mx-auto max-w-3xl font-['Inter','Noto_Sans_Bengali',sans-serif]">
        {/* Page heading */}
        <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A6B00]">
          <span className="h-px w-8 bg-[#9A6B00]" />
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span>Notice Board</span>
          <span className="h-px w-8 bg-[#9A6B00]" />
        </div>

        <h1
          className={`${serif} mt-3 text-center text-2xl font-bold text-[#0A1F6B] sm:text-3xl md:text-4xl`}
        >
          Approved Notices
        </h1>

        {loading ? (
          <Loading message="Loading notices..." />
        ) : error ? (
          <p className="mt-8 text-center text-red-500">
            Sorry, we couldn't load the notices. Please try again.
          </p>
        ) : (
          <>
            {/* New notices (last month) */}
            <NoticeBox
              icon={BellRing}
              title="New Notices"
              subtitle="Published within the last month"
              count={`${newNotices.length} new`}
              headerColor="bg-[#00237A]"
            >
              {newNotices.length > 0 ? (
                newNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} isNew />
                ))
              ) : (
                <EmptyMessage
                  icon={BellOff}
                  title="No recent notices"
                  text="New notices from the last month will appear here."
                />
              )}
            </NoticeBox>

            {/* Older notices */}
            <NoticeBox
              icon={History}
              title="Previous Notices"
              subtitle="One month old or older"
              count={noticeCount(previousNotices.length)}
              headerColor="bg-[#4A5B8C]"
            >
              {previousNotices.length > 0 ? (
                previousNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))
              ) : (
                <EmptyMessage
                  icon={History}
                  title="No previous notices"
                  text="Older notices will appear here."
                />
              )}
            </NoticeBox>
          </>
        )}

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

