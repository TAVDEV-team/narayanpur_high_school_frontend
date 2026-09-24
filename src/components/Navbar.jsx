
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  LogIn,
  User,
} from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mobileRef = useRef(null);
  const navRef = useRef(null);

  /* =========================
     AUTH STATE
  ========================= */

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("accessToken")));
    };

    checkAuth();

    window.addEventListener("login", checkAuth);
    window.addEventListener("logout", checkAuth);

    return () => {
      window.removeEventListener("login", checkAuth);
      window.removeEventListener("logout", checkAuth);
    };
  }, []);

  /* =========================
     SCROLL EFFECT
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     CLOSE ON ESCAPE
  ========================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =========================
     CLICK OUTSIDE MOBILE MENU
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!mobileOpen) return;

      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  /* =========================
     CLOSE MOBILE ON DESKTOP
  ========================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        "https://narayanpur-high-school.onrender.com/api/user/logout/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      localStorage.removeItem("accessToken");

      setIsLoggedIn(false);
      setMobileOpen(false);

      window.dispatchEvent(new Event("logout"));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  /* =========================
     NAVIGATION DATA
  ========================= */

  const academicLinks = [
    {
      label: "Documents",
      to: "/documents",
    },
    {
      label: "Notices",
      to: "/notice-approved",
    },
    {
      label: "Routine",
      to: "/routine",
    },
    {
      label: "Syllabus",
      to: "/syllabus",
    },
  ];

  const administrationLinks = [
    {
      label: "Governing Body",
      to: "/governing-body",
    },
    {
      label: "Teacher Info",
      to: "/teacher",
    },
    {
      label: "Staff Info",
      to: "/staffs",
    },
  ];

  const commonLinks = [
    {
      label: "Students",
      to: "/portal",
    },
    {
      label: "Result",
      to: "/results",
    },
    {
      label: "Gallery",
      to: "/gallery",
    },
    {
      label: "Contact",
      to: "/contact",
    },
  ];

  /* =========================
     NAVBAR
  ========================= */

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 shadow-md backdrop-blur-md"
          : "bg-[#00236f]/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full shadow-sm">
            <img
              src="/logo.png"
              alt="Narayanpur High School"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <p
              className={`font-serif text-lg font-bold leading-tight transition-colors ${
                scrolled ? "text-[#00236f]" : "text-white"
              }`}
            >
              Narayanpur High School
            </p>

            <p
              className={`text-[9px] font-bold uppercase tracking-[0.18em] ${
                scrolled ? "text-[#855300]" : "text-yellow-300"
              }`}
            >
              Established 1980
            </p>
          </div>
        </Link>


        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <div className="hidden items-center gap-1 md:flex">

          <NavLink
            to="/"
            label="Home"
            scrolled={scrolled}
          />

          <Dropdown
            label="Academic"
            links={academicLinks}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            id="academic"
            scrolled={scrolled}
          />

          <Dropdown
            label="Administration"
            links={administrationLinks}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            id="administration"
            scrolled={scrolled}
          />

          {commonLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              label={item.label}
              scrolled={scrolled}
            />
          ))}

          {/* Authentication */}

          {isLoggedIn ? (
            <Link
              to="/profile"
              className={`ml-3 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                scrolled
                  ? "border-[#00236f] text-[#00236f] hover:bg-[#00236f] hover:text-white"
                  : "border-white/60 text-white hover:bg-white hover:text-[#00236f]"
              }`}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className={`ml-3 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition ${
                scrolled
                  ? "bg-[#00236f] text-white hover:bg-[#00184d]"
                  : "bg-white text-[#00236f] hover:bg-yellow-300"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>


        {/* =========================
            MOBILE BUTTON
        ========================== */}

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition md:hidden ${
            scrolled
              ? "text-[#00236f] hover:bg-slate-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>


      {/* =========================
          MOBILE MENU
      ========================== */}

      <div
        ref={mobileRef}
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden ${
          mobileOpen
            ? "max-h-[90vh] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[80vh] overflow-y-auto px-5 py-5">

          <MobileLink
            to="/"
            label="Home"
            closeMenu={() => setMobileOpen(false)}
          />

          <MobileDropdown
            label="Academic"
            links={academicLinks}
          />

          <MobileDropdown
            label="Administration"
            links={administrationLinks}
          />

          {commonLinks.map((item) => (
            <MobileLink
              key={item.to}
              to={item.to}
              label={item.label}
              closeMenu={() => setMobileOpen(false)}
            />
          ))}

          {/* Authentication */}

          {isLoggedIn ? (
            <>
              <MobileLink
                to="/profile"
                label="Profile"
                closeMenu={() => setMobileOpen(false)}
              />

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#00236f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00184d]"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}


/* =====================================================
   DESKTOP NAV LINK
===================================================== */

function NavLink({ to, label, scrolled }) {
  return (
    <Link
      to={to}
      className={`relative rounded-md px-3 py-2 text-sm font-semibold transition ${
        scrolled
          ? "text-[#24324a] hover:text-[#00236f]"
          : "text-white hover:text-yellow-300"
      }`}
    >
      {label}
    </Link>
  );
}


/* =====================================================
   DESKTOP DROPDOWN
===================================================== */

function Dropdown({
  label,
  links,
  openMenu,
  setOpenMenu,
  id,
  scrolled,
}) {
  const isOpen = openMenu === id;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(id)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
          scrolled
            ? "text-[#24324a] hover:text-[#00236f]"
            : "text-white hover:text-yellow-300"
        }`}
      >
        {label}

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full pt-2">
          <div className="w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">

            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eff4ff] hover:text-[#00236f]"
                onClick={() => setOpenMenu(null)}
              >
                {link.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}


/* =====================================================
   MOBILE LINK
===================================================== */

function MobileLink({ to, label, closeMenu }) {
  return (
    <Link
      to={to}
      onClick={closeMenu}
      className="block border-b border-slate-100 px-2 py-3.5 text-sm font-semibold text-[#24324a] transition hover:text-[#00236f]"
    >
      {label}
    </Link>
  );
}


/* =====================================================
   MOBILE DROPDOWN
===================================================== */

function MobileDropdown({ label, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100">

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-2 py-3.5 text-sm font-semibold text-[#24324a]"
      >
        <span>{label}</span>

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mb-2 ml-3 border-l-2 border-[#00236f]/10 pl-3">

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-3 py-2.5 text-sm text-slate-600 transition hover:text-[#00236f]"
            >
              {link.label}
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}

