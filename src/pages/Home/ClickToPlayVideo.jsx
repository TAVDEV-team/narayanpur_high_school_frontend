
"use client";

import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";

export default function ClickToPlayVideo() {
  const [play, setPlay] = useState(false);

  return (
    <section className="bg-blue-50 py-20 sm:py-24 lg:py-28">
      <div className="bg-[#00236f] rounded-3xl mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] mt-10 text-[#f0b33a]">
              Experience Our Campus
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white mt-5 sm:text-4xl">
              See Narayanpur High School
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-200">
            Take a closer look at our campus, students, and the environment
            where learning happens every day.
          </p>

        </div>

        {/* Video */}
        <div
          className={`group relative overflow-hidden rounded-2xl bg-[#00236f] shadow-xl ${
            !play ? "cursor-pointer" : ""
          }`}
          onClick={() => !play && setPlay(true)}
        >

          <video
            src="/video.mp4"
            className="h-[300px] w-full object-cover sm:h-[450px] lg:h-[560px]"
            loop
            playsInline
            controls={play}
            autoPlay={play}
          />

          {!play && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-[#00236f]/45 transition duration-300 group-hover:bg-[#00236f]/35">

             <button
  type="button"
  aria-label="Play school video"
  className="
    group/play
    relative
    flex
    h-24
    w-24
    items-center
    justify-center
    rounded-full
    bg-[#eba82b]
    text-[#00236f]
    shadow-[0_0_0_8px_rgba(235,168,43,0.20),0_12px_35px_rgba(0,0,0,0.25)]
    transition-all
    duration-500
    hover:scale-110
    hover:bg-[#f5b936]
    hover:shadow-[0_0_0_12px_rgba(235,168,43,0.18),0_18px_45px_rgba(0,0,0,0.30)]
    active:scale-95
  "
>
  {/* Outer animated ring */}
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

  {/* Inner highlight */}
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
      h-9
      w-9
      fill-current
      transition-transform
      duration-500
      group-hover/play:scale-110
    "
  />
</button>

            </div>
          )}

          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 right-0 hidden items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 sm:flex">
            <span className="text-sm font-semibold text-white">
              Narayanpur High School • Cumilla
            </span>

            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="mt-20 flex justify-center">
           
          </div>

      </div>
    </section>
  );
}
