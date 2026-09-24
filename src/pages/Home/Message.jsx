import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
} from "swiper/modules";
import { History, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import API from "../../api/api";

export default function MessageCarousel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get("/nphs/message/");
        setMessages(res.data.results || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="bg-slate-100 py-20 sm:py-24 lg:py-28 text-[#0b1c30]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[450px] items-center justify-center">
            <p className="text-sm font-medium text-slate-500">
              Loading teachers' messages...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && messages.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <p className="font-semibold text-[#00236f]">
              No messages available at the moment.
            </p>
          </div>
        )}

        {/* Messages */}
        {!loading && messages.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            slidesPerView={1}
            spaceBetween={30}
            speed={700}
            grabCursor
            navigation={messages.length > 1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={messages.length > 1}
            className="principal-message-swiper !pb-14"
          >
            {messages.map((msg, index) => (
              <SwiperSlide key={index}>

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">

                  {/* =========================
                      LEFT — TEACHER PORTRAIT
                  ========================== */}
                  <div className="relative lg:col-span-5">

                    {/* Portrait Card */}
                    <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-5">

                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden rounded-xl">

                        <img
                          src={
                            msg.message_of?.image ||
                            "/default.png"
                          }
                          alt={
                            msg.message_of?.full_name ||
                            "Teacher"
                          }
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />

                      </div>

                      {/* Teacher information */}
                      <div className="pt-5 text-center">

                        <h3 className="font-serif text-2xl font-bold text-[#00236f] sm:text-3xl">
                          {msg.message_of?.full_name}
                        </h3>

                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#855300]">
                          Teacher &amp; Educator
                        </p>

                        <p className="mt-2 text-sm text-[#444651]">
                          Narayanpur High School
                        </p>

                      </div>
                    </div>

                    {/* Decorative badge */}
                    <div className="absolute -right-3 -top-4 hidden h-20 w-20 flex-col items-center justify-center rounded-full bg-[#855300] p-2 text-center text-white shadow-lg sm:flex">

                      <History className="h-5 w-5" />

                      <span className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-wide">
                        Teacher's
                        <br />
                        Voice
                      </span>

                    </div>

                  </div>


                  {/* =========================
                      RIGHT — MESSAGE
                  ========================== */}
                  <div className="lg:col-span-7">

                    {/* Small label */}
                    <div className="mb-3 flex items-center gap-2 text-[#855300]">

                      <History className="h-[18px] w-[18px]" />

                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                        Leadership Perspective
                      </span>

                    </div>


                    {/* Heading */}
                    <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#00236f] sm:text-4xl lg:text-[40px] lg:leading-[48px]">
                      A Message from Our Teacher
                    </h2>


                    {/* Main quotation */}
                    <div className="relative mt-7 py-2 pl-7">

                      {/* Decorative quote */}
                      <span className="absolute left-0 top-0 select-none font-serif text-[80px] leading-none text-[#00236f]/15 sm:text-[96px]">
                        “
                      </span>

                      <blockquote className="relative font-serif text-xl italic leading-relaxed text-[#00236f] sm:text-2xl lg:text-[30px] lg:leading-[38px]">
                        {msg.message}
                      </blockquote>

                    </div>


                    {/* Supporting message */}
                    <p className="mt-7 text-base leading-7 text-[#444651]">
                      Our teachers play a vital role in guiding students,
                      encouraging curiosity, and helping every learner build
                      confidence, discipline, and a strong foundation for the
                      future.
                    </p>


                    {/* Signature */}
                    <div className="mt-8 flex items-center justify-between border-t border-[#c5c5d3] pt-6">

                      <div>

                        <div className="font-serif text-2xl font-bold italic text-[#00236f]">
                          {msg.message_of?.full_name}
                        </div>

                        <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#444651]">
                          Educator • Narayanpur High School
                        </div>

                      </div>

                      <div className="hidden sm:block">

                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#00236f] transition hover:underline">
                          Our Educators
                          <ArrowRight className="h-4 w-4" />
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}
