
import {
  CalendarDays,
  Users,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export default function ExploreCards() {
  const features = [
    {
      category: "Academic",
      title: "Class Routine",
      desc: "Check daily and weekly class routines for all grades and subjects.",
      icon: CalendarDays,
      href: "/routine",
    },
    {
      category: "Community",
      title: "Our Teachers",
      desc: "Meet the dedicated teachers who guide, support, and inspire our students.",
      icon: Users,
      href: "/teacher",
    },
    {
      category: "Connect",
      title: "Contact Us",
      desc: "Reach out to the school for inquiries, feedback, or support.",
      icon: Phone,
      href: "/contact",
    },
  ];

  return (
    <section className="bg-slate-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADING
        ========================== */}
        <div className="mb-14 lg:mb-16">

          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#a06a00]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a06a00]">
              Pathways to Excellence
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#00236f] sm:text-5xl lg:text-[52px] lg:leading-[1.1]">
              Discover Our School
            </h2>

            <div className="mt-5 h-[2px] w-16 bg-[#a06a00]" />

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore the resources, people, and opportunities that make
              Narayanpur High School a place for learning, growth, and
              community.
            </p>
          </div>
        </div>

        {/* =========================
            CARDS
        ========================== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex min-h-[280px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8f9fc] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl"
              >
                <div>

                  {/* Icon + Category */}
                  <div className="mb-7 flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9edf7] text-[#00236f] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00236f]">
                      {item.category}
                    </span>

                  </div>

                  {/* Card title */}
                  <h3 className="text-2xl font-bold tracking-tight text-[#00236f]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>

                </div>

                {/* Link */}
                <a
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-[#00236f]"
                >
                  Explore

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
