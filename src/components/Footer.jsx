import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#00184f] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* School */}
          <div className="lg:col-span-5">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <img
                  src="/logo.png"
                  alt="Narayanpur High School"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Narayanpur High School
                </h2>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#d7b35d]">
                  Chauddagram • Cumilla
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-md text-sm leading-7 text-blue-100/75">
              Empowering students through quality education, discipline,
              character, and lifelong learning. Building a stronger future
              through education and community.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d7b35d]" />

                <span className="text-sm text-blue-100/80">
                  Chauddagram, Cumilla, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#d7b35d]" />

                <a
                  href="tel:+8801819823733"
                  className="text-sm text-blue-100/80 transition hover:text-white"
                >
                  +880 1819-823733
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#d7b35d]" />

                <a
                  href="mailto:sn105409@gmail.com"
                  className="text-sm text-blue-100/80 transition hover:text-white"
                >
                  sn105409@gmail.com
                </a>
              </div>

            </div>
          </div>

          {/* School */}
          <div className="lg:col-span-2">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white">
              School
            </h3>

            <ul className="space-y-3 text-sm text-blue-100/70">

              <li>
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/teacher"
                  className="transition hover:text-white"
                >
                  Teachers
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="transition hover:text-white"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Academic */}
          <div className="lg:col-span-2">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white">
              Academic
            </h3>

            <ul className="space-y-3 text-sm text-blue-100/70">

              <li>
                <Link
                  href="/documents"
                  className="transition hover:text-white"
                >
                  Documents
                </Link>
              </li>

              <li>
                <Link
                  href="/notice-approved"
                  className="transition hover:text-white"
                >
                  Notices
                </Link>
              </li>

              <li>
                <Link
                  href="/routine"
                  className="transition hover:text-white"
                >
                  Class Routine
                </Link>
              </li>

              <li>
                <Link
                  href="/syllabus"
                  className="transition hover:text-white"
                >
                  Syllabus
                </Link>
              </li>

            </ul>
          </div>

          {/* Administration */}
          <div className="lg:col-span-3">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white">
              Administration
            </h3>

            <ul className="space-y-3 text-sm text-blue-100/70">

              <li>
                <Link
                  href="/governing-body"
                  className="inline-flex items-center gap-1 transition hover:text-white"
                >
                  Governing Body
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>

              <li>
                <Link
                  href="/teacher"
                  className="inline-flex items-center gap-1 transition hover:text-white"
                >
                  Teacher Information
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>

              <li>
                <Link
                  href="/staffs"
                  className="inline-flex items-center gap-1 transition hover:text-white"
                >
                  Staff Information
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>

            </ul>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:px-8 md:flex-row md:text-left lg:px-12">

          <p className="text-xs text-blue-100/50">
            © {new Date().getFullYear()} Narayanpur High School. All rights reserved.
          </p>

          <a
            href="https://tavdev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-100/50 transition hover:text-white"
          >
            Developed by TavDev
          </a>

        </div>
      </div>

    </footer>
  );
}
