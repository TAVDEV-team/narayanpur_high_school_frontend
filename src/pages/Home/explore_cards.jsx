
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
    <section className="bg-blue-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a06a00]">
              Pathways to Excellence
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#00236f] sm:text-4xl">
              Discover Our School
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-700">
            Explore the resources, people, and opportunities that make
            Narayanpur High School a place for learning and growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex min-h-[280px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8f9fc] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl"
              >
                <div>

                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9edf7] text-[#00236f] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00236f]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#00236f]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>
                </div>

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
