import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import API from "../../api/api";
import Loading from "../../components/Loading";

export default function NoticeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = location.state?.from || "approved";

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API
      .get(`/nphs/notices/${id}/`)
      .then((res) => setNotice(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!notice) {
    return (
      <main className="min-h-screen bg-[#F3F5FA] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#00236F] mb-3">
            Notice not found
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-[#1E3A8A] hover:text-[#00236F] hover:underline"
          >
            Return to notices
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    notice.notice_for_date
  ).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const paragraphs = notice.description
    .split("\n")
    .map((para) => para.trim())
    .filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F3F5FA] px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#00236F] transition hover:text-[#1E3A8A]"
        >
          <ArrowLeft size={18} />
          Back to Notices
        </button>

        {/* Notice document */}
        <article className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Document header */}
          <header className="relative overflow-hidden bg-[#00236F] px-6 py-10 sm:px-10 sm:py-12">
            {/* Header grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative">
              {/* School identity */}
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="Narayanpur High School"
                  className="h-16 w-16 rounded-xl object-contain bg-white p-1 sm:h-20 sm:w-20"
                />

                <div>
                  <p className="font-serif text-xl font-bold text-white sm:text-2xl">
                    Narayanpur High School
                  </p>

                  <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-[#FFDDB8] uppercase">
                    Established 1959
                  </p>
                </div>
              </div>

              {/* Notice label */}
              <div className="mt-10">
                <span className="inline-flex rounded-full bg-[#1E3A8A] px-4 py-2 text-xs font-bold tracking-[0.16em] text-[#FFDDB8] uppercase">
                  School Notice
                </span>

                <h1 className="mt-5 max-w-3xl font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {notice.title}
                </h1>

                <p className="mt-5 text-sm font-medium text-white/70 sm:text-base">
                  {formattedDate}
                </p>
              </div>
            </div>
          </header>

          {/* Notice content */}
          <section className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div className="mx-auto max-w-3xl">
              {/* Location / institution context */}
              <div className="mb-10 border-b border-slate-200 pb-6">
                <p className="text-sm font-semibold text-[#00236F]">
                  Narayanpur High School
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  AmjadNagar, Chauddagram, Cumilla 3500, Bangladesh
                </p>
              </div>

              {/* Body */}
              <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Approval */}
              {fromPage === "approved" && notice.approved_by_headmaster && (
                <div className="mt-12 border-t border-slate-200 pt-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00236F]">
                        <CheckCircle2
                          size={20}
                          className="text-[#FFDDB8]"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-[#00236F]">
                          Approved by Headmaster
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Narayanpur High School
                        </p>
                      </div>
                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-xs font-bold tracking-[0.14em] text-slate-400 uppercase">
                        Official Notice
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Document footer */}
          <footer className="border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-10">
            <p className="text-center text-xs font-medium text-slate-400">
              Narayanpur High School · Cumilla, Bangladesh
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
