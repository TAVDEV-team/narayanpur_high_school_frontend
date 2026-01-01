import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-8">
      <div className="absolute inset-0 bg-gradient-to-bl from-[#0f1f5f] to-black" />

      <div className="relative z-10 text-white py-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Section 1 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Narayanpur High School
            </h3>
            <p className="text-sm md:text-base">
              Empowering students through quality education and values.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <a
                  href="https://bangladesh.gov.bd/index.php"
                  className="hover:text-yellow-300 inline-block"
                  aria-label="Education Board"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Education Board
                </a>
              </li>
              <li>
                <a
                  href="https://www.nu.ac.bd/"
                  className="hover:text-yellow-300 inline-block"
                  aria-label="Ministry of Education"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ministry Of Education
                </a>
              </li>
              <li>
                <a
                  href="https://nctb.gov.bd/"
                  className="hover:text-yellow-300 inline-block"
                  aria-label="Directorate of Secondary and Higher Education"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directorate of Secondary & Higher Education
                </a>
              </li>
              <li>
                <a
                  href="https://comillaboard.portal.gov.bd/"
                  className="hover:text-yellow-300 inline-block"
                  aria-label="Cumilla Education Board"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cumilla Education Board
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Contact</h3>
            <p className="text-sm md:text-base leading-relaxed">
              📍 Chauddagram, Cumilla, Bangladesh
              <br />
              ☎️ <a>
                +8801819823733 
              </a>
              <br />
              ✉️{" "}
              <a
                aria-label="Email"
              >
                sn105409@gmail.com
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-8 text-gray-300">
          © {new Date().getFullYear()} Narayanpur High School. All rights reserved.
          <br />
          <a href="https://tavdev.com/">Developed by TavDev</a>
        </p>
      </div>
    </footer>
  );
}
