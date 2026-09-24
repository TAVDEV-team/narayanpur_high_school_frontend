
"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  CalendarDays,
} from "lucide-react";

import Loading from "../../components/Loading";
import { ListAPI } from "../../api/ListAPI";

export default function LatestNotices() {
  const {
    data: notices,
    loading,
  } = ListAPI("/nphs/notices/approved/");

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="bg-[#00236f] rounded-3xl mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

      
{/* Heading */}
<div className="mb-12 flex flex-col gap-8 pt-10 md:flex-row md:items-end md:justify-between">

  {/* Heading Content */}
  <div className="max-w-2xl">

    {/* Eyebrow */}
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-10 bg-[#e9a318]" />

      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e9a318]">
        School Updates
      </span>

      <span className="h-px w-10 bg-[#e9a318]" />
    </div>

    {/* Main Heading */}
    <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[52px]">
      Stay Informed.
      <br />
      <span className="text-[#e9a318]">
        Stay Connected.
      </span>
    </h2>

    {/* Description */}
    <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
      Stay up to date with the latest announcements, academic updates,
      events, and important information from Narayanpur High School.
    </p>

  </div>

  {/* View All Button */}
  <Link
    to="/notice-approved"
    className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#00236f]"
  >
    <span>View All Notices</span>

    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>

</div>


        {/* Loading */}
        {loading && (
          <div className="py-12">
            <Loading message="Loading notices..." />
          </div>
        )}

        {/* Notices */}
        {!loading && notices?.length > 0 && (
          <div className="space-y-4">

            {notices.slice(0, 4).map((notice) => {

              const date = new Date(notice.notice_for_date);

              return (
                <div
                  key={notice.slug}
                  className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >

                  {/* Left */}
                  <div className="flex items-start gap-4 sm:items-center">

                    {/* Date */}
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-[#edf0f7] text-[#00236f]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#a06a00]">
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>

                      <span className="text-2xl font-bold leading-none">
                        {date.getDate()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">

                      <div className="mb-2 flex flex-wrap items-center gap-2">

                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e9edf7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00236f]">
                          <CalendarDays className="h-3 w-3" />
                          Notice
                        </span>

                      </div>

                      <h3 className="text-base font-bold text-[#00236f] sm:text-lg">
                        {notice.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {notice.description}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/notices/${notice.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-1 self-start rounded-lg bg-[#00236f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123b91] sm:self-auto"
                  >
                    Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && (!notices || notices.length === 0) && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <Bell className="mx-auto h-8 w-8 text-slate-400" />

            <p className="mt-4 font-semibold text-[#00236f]">
              No approved notices available
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please check again later for new school announcements.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && notices?.length > 0 && (
          <div className="mt-20 flex justify-center">
            {/* <Link
              to="/notice-approved"
              className="inline-flex items-center gap-2 rounded-lg border pt-5 border-white px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#00236f]"
            >
              View All Institutional Notices
              <ArrowRight className="h-4 w-4" />
            </Link> */}
          </div>
        )}

      </div>
    </section>
  );
}
