
import React from "react";

export default function Hero({
  imageSrc = "/school.jpg",
  title = "Empowering Minds,",
  highlight = "Shaping Tomorrow's Leaders.",
  description = "Narayanpur High School is a boys & girls educational institute in Narayanpur, Chauddagram, Cumilla. We believe every student is unique and deserves the opportunity to learn, grow, and succeed.",
}) {
  return (
    <section className="relative overflow-hidden bg-[#00236f] text-white">
      {/* Subtle architectural grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="24"
                cy="24"
                r="1.5"
                fill="currentColor"
              />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#hero-grid)"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">

          {/* Left Content */}
          <div className="space-y-7 lg:col-span-7">

            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#ffddb8] backdrop-blur-md">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#fea619]" />

              65-Year Scholastic Heritage • Est. 1959
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {title}
              <br />

              <span className="font-serif font-light italic text-[#ffddb8]">
                {highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base leading-7 text-[#dae2fd] sm:text-lg">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">

              {/* Primary CTA */}
              <a
                href="#campus-tour"
                className="group inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#00236f] shadow-md transition-all hover:bg-[#eff4ff]"
              >
                <span>Schedule a Campus Tour</span>

                <span className="ml-1.5 text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              {/* Secondary CTA */}
              <a
                href="/documents"
                className="group inline-flex items-center justify-center rounded-lg bg-[#1e3a8a] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#264191]"
              >
                <span>Explore Admissions</span>

                <span className="ml-1.5 text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:col-span-5">

            <div className="relative overflow-hidden rounded-xl bg-[#384055] shadow-2xl">

              {/* School Image */}
              <img
                src={imageSrc}
                alt="Narayanpur High School campus"
                className="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px] lg:h-[440px]"
              />

              {/* Image Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/80 via-transparent to-transparent" />

              {/* Image Information Card */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-white/90 p-4 text-[#0b1c30] shadow-lg backdrop-blur-md">

                <div className="flex items-center gap-3">

                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00236f] text-white">
                    <span className="text-lg">✓</span>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#00236f]">
                      Narayanpur High School
                    </div>

                    <div className="text-xs text-gray-600">
                      Learning • Character • Excellence
                    </div>
                  </div>

                </div>

                <span className="hidden text-[10px] font-bold uppercase tracking-wider text-[#855300] sm:block">
                  Cumilla, Bangladesh
                </span>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Statistics Ribbon */}
      <div className="w-full bg-[#222a3e] py-6 shadow-inner">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:text-left">

            {/* Stat 1 */}
            <div className="space-y-1">
              <div className="text-3xl font-bold text-[#ffddb8]">
                65+
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest text-[#bec6e0]">
                Years of Heritage
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">
                100%
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest text-[#bec6e0]">
                Student Focused
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">
                1+
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest text-[#bec6e0]">
                Generations Served
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1">
              <div className="text-3xl font-bold text-[#ffddb8]">
                Cumilla
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest text-[#bec6e0]">
                Bangladesh
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

