import { useEffect, useRef, useState } from "react";

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
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div
          className={`max-w-3xl mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight">
            Discover
            <br />
            <span className="text-gray-600">
              Narayanpur High School
            </span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Images */}
          <div
            className={`relative pr-6 sm:pr-10 transition-all duration-1000 ease-out delay-150 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >

            {/* Main image */}
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/buildin2.jpg"
                alt="Narayanpur High School"
                className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Small image */}
            <div
              className={`absolute -bottom-8 -right-1 sm:-right-5 w-36 sm:w-48 overflow-hidden rounded-2xl border-8 border-slate-50 shadow-xl transition-all duration-700 ease-out delay-500 ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <img
                src="/building3.jpg"
                alt="Narayanpur High School building"
                className="w-full h-28 sm:h-36 object-cover"
              />
            </div>

          </div>

          {/* Text */}
          <div
            className={`lg:pl-4 max-w-2xl transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >

            <p className="text-lg sm:text-xl leading-relaxed text-gray-1000">
              Narayanpur High School is one of the most prestigious and important
              educational institutions in Chauddagram, Cumilla. It was established
              in 1980 with only five classes and has since grown into a respected
              institution with modern facilities and a reputation for discipline,
              education, and character.
            </p>

            <p className="mt-7 text-lg sm:text-xl leading-relaxed text-gray-600">
              Today, it accommodates thousands of students in Bangla 
              versions, housed in multiple multi-storied buildings. The school was
              founded with the vision of providing quality education and has grown
              from a small setup into a fully established institution, now educating
              over <span className="font-semibold text-blue-950">500 students</span>.
            </p>

            {/* Statistics */}
            <div
              className={`mt-12 pt-8 border-t border-gray-200 transition-all duration-700 ease-out delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="grid grid-cols-3 divide-x divide-gray-200">

                {/* Established */}
                <div className="px-3 sm:px-6 first:pl-0">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-950">
                    1980
                  </p>

                  <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500">
                    Established
                  </p>
                </div>

                {/* Students */}
                <div className="px-3 sm:px-6">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-950">
                    500+
                  </p>

                  <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500">
                    Students
                  </p>
                </div>

                {/* Years */}
                <div className="px-3 sm:px-6 last:pr-0">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-950">
                    40+
                  </p>

                  <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500">
                    Years
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}