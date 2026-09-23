
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";

export default function WelcomeMessage() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#f7f8fb] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div
          className={`mb-14 max-w-3xl transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a06a00]">
            <BookOpen className="h-4 w-4" />
            Our Heritage
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#00236f] sm:text-4xl lg:text-5xl">
            Discover Narayanpur High School
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">

          {/* Image */}
          <div
            className={`relative lg:col-span-5 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/buildin2.jpg"
                  alt="Narayanpur High School"
                  className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[460px]"
                />
              </div>
            </div>

            {/* Small image */}
            <div className="absolute -bottom-8 -right-3 hidden w-44 overflow-hidden rounded-xl border-8 border-[#f7f8fb] shadow-xl sm:block">
              <img
                src="/building3.jpg"
                alt="Narayanpur High School building"
                className="h-32 w-full object-cover"
              />
            </div>

            {/* Established badge */}
            <div className="absolute -left-4 -top-5 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#a06a00] text-center text-white shadow-lg">
              <span className="text-xl font-bold">40+</span>
              <span className="text-[8px] font-bold uppercase tracking-wider">
                Years
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <p className="text-2xl font-serif italic leading-relaxed text-[#00236f] sm:text-3xl">
              “Education is not simply about learning facts. It is about
              developing character, confidence, curiosity, and the courage to
              build a better future.”
            </p>

            <div className="mt-8 space-y-5 text-base leading-7 text-slate-600 sm:text-lg">
              <p>
                Narayanpur High School is a respected educational institution
                in Narayanpur, Chauddagram, Cumilla. Our goal is to provide
                students with a strong educational foundation while encouraging
                discipline, creativity, responsibility, and personal growth.
              </p>

              <p>
                From its beginning as a local educational initiative, the
                school has grown into a community institution serving hundreds
                of students. We continue to focus on quality education,
                dedicated teachers, and an environment where every student has
                the opportunity to discover their potential.
              </p>
            </div>

            {/* Signature / link */}
            <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-7">
              <div>
                <div className="font-serif text-xl font-bold italic text-[#00236f]">
                  Narayanpur High School
                </div>

                <div className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                  Chauddagram • Cumilla
                </div>
              </div>

              <a
                href="/governing-body"
                className="group inline-flex items-center gap-1 text-sm font-bold text-[#00236f]"
              >
                Learn More

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Statistics */}
            <div className="mt-10 grid grid-cols-3 border-t border-slate-200 pt-8">

              <div>
                <p className="text-3xl font-bold tracking-tight text-[#00236f] sm:text-4xl">
                  1980
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
                  Established
                </p>
              </div>

              <div className="border-l border-slate-200 px-4 sm:px-8">
                <p className="text-3xl font-bold tracking-tight text-[#00236f] sm:text-4xl">
                  500+
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
                  Students
                </p>
              </div>

              <div className="border-l border-slate-200 px-4 sm:px-8">
                <p className="text-3xl font-bold tracking-tight text-[#00236f] sm:text-4xl">
                  40+
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
                  Years
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
