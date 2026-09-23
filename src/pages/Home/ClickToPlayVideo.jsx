

import { useState } from "react";
import { Play, Video, ArrowUpRight } from "lucide-react";

export default function ClickToPlayVideo() {
  const [play, setPlay] = useState(false);

  return (
    <section className="bg-slate-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Main navy container */}
        <div className="relative overflow-hidden rounded-3xl bg-[#00236f] p-6 shadow-2xl sm:p-10 lg:p-16">

          {/* Subtle architectural dotted texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Heading */}
          <div className="relative z-10 mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f0b33a] backdrop-blur-md">

              <Video className="h-4 w-4" />

              <span>
                Interactive Experience
              </span>

            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Experience Life at Narayanpur High School
            </h2>

            {/* Description */}
            <p className="mt-5 text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
              Take a closer look at our campus, students, and the environment
              where learning happens every day.
            </p>

          </div>


          {/* Video wrapper */}
          <div
            className={`group relative z-10 mx-auto max-w-4xl overflow-hidden rounded-2xl bg-[#001b55] shadow-2xl ${
              !play ? "cursor-pointer" : ""
            }`}
            onClick={() => !play && setPlay(true)}
          >

            {/* 16:9 video frame */}
            <div className="relative aspect-video w-full">

              <video
                src="/video.mp4"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loop
                playsInline
                controls={play}
                autoPlay={play}
              />


              {/* Overlay */}
              {!play && (
                <div className="absolute inset-0 bg-[#00236f]/40 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-[#00236f]/30" />
              )}


              {/* Top badge */}
              {!play && (
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#00236f] shadow-md backdrop-blur-md sm:left-5 sm:top-5">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

                  <span>
                    Campus Experience
                  </span>

                </div>
              )}


              {/* Center play button */}
              {!play && (
                <div className="absolute inset-0 flex items-center justify-center">

                  <button
                    type="button"
                    aria-label="Play school video"
                    className="
                      group/play
                      relative
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-full
                      bg-[#eba82b]
                      text-[#00236f]
                      shadow-[0_0_0_8px_rgba(235,168,43,0.20),0_15px_40px_rgba(0,0,0,0.30)]
                      transition-all
                      duration-500
                      hover:scale-110
                      hover:bg-[#f5b936]
                      hover:shadow-[0_0_0_12px_rgba(235,168,43,0.18),0_20px_50px_rgba(0,0,0,0.35)]
                      active:scale-95
                      sm:h-24
                      sm:w-24
                    "
                  >

                    {/* Outer ring */}
                    <span
                      className="
                        absolute
                        inset-[-8px]
                        rounded-full
                        border
                        border-[#eba82b]/60
                        transition-all
                        duration-500
                        group-hover/play:inset-[-12px]
                        group-hover/play:border-[#eba82b]
                      "
                    />

                    {/* Inner ring */}
                    <span
                      className="
                        absolute
                        inset-2
                        rounded-full
                        border
                        border-white/30
                      "
                    />

                    {/* Play icon */}
                    <Play
                      className="
                        relative
                        z-10
                        ml-1
                        h-8
                        w-8
                        fill-current
                        transition-transform
                        duration-500
                        group-hover/play:scale-110
                        sm:h-9
                        sm:w-9
                      "
                    />

                  </button>

                </div>
              )}


              {/* Bottom information */}
              {!play && (
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-20 sm:p-6 sm:pt-24">

                  <div>
                    <p className="text-sm font-bold text-white sm:text-base">
                      Narayanpur High School
                    </p>

                    <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                      Chauddagram, Cumilla
                    </p>
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                </div>
              )}

            </div>
          </div>


          {/* Bottom text */}
          <div className="relative z-10 mt-8 text-center">

            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-300">
              Discover • Learn • Grow
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
