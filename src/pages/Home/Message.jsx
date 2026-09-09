import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import API from "../../api/api";
import CardHeader from "../../components/Titles/CardHeads";

export default function MessageCarousel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get("/nphs/message/");
        setMessages(res.data.results);
        console.log(res.data.results);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">

        <CardHeader text="Teachers Message" />

        {messages.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            slidesPerView={1}
            spaceBetween={20}
            speed={700}
            grabCursor={true}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={messages.length > 1}
            className="teachers-message-swiper"
          >
            {messages.map((msg, index) => (
              <SwiperSlide key={index} className="pb-12">

                <div
                  className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    overflow-hidden

                    p-5
                    sm:p-7
                    md:p-8
                    lg:p-10

                    grid
                    grid-cols-1
                    md:grid-cols-2

                    gap-7
                    sm:gap-8
                    md:gap-10

                    items-center
                  "
                >

                  {/* Teacher Image */}
                  <div className="flex justify-center md:justify-start">
                    <div
                      className="
                        relative

                        w-[300px]
                        h-[300px]
                        sm:w-[340px]
                        sm:h-[340px]
                        md:w-[390px]
                        md:h-[390px]
                        lg:w-[430px]
                        lg:h-[430px]

                        rounded-full
                        p-2

                        bg-white
                        border-[3px]
                        border-blue-200

                        shadow-[0_0_35px_rgba(59,130,246,0.25)]
                      "
                    >

                      {/* Decorative outer ring */}
                      <div
                        className="
                          absolute
                          inset-[-10px]
                          rounded-full
                          border
                          border-blue-200
                          pointer-events-none
                        "
                      ></div>

                      

                      {/* Teacher photo */}
                      <img
                        src={msg.message_of.image || "/default.png"}
                        alt={msg.message_of.full_name}
                        className="
                          w-full
                          h-full
                          rounded-full
                          object-cover
                          object-[center_20%]
                          border-4
                          border-white
                          transition-transform
                          duration-300
                          md:hover:scale-[1.02]
                        "
                      />

                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative text-gray-900">

                    {/* Quote decoration */}
                    <div className="
                      absolute
                      -top-8
                      sm:-top-10
                      md:-top-14
                      -left-1
                      text-6xl
                      sm:text-7xl
                      md:text-8xl
                      font-serif
                      font-bold
                      text-blue-200
                      leading-none
                    ">
                      “
                    </div>

                    <p className="
                      relative
                      text-lg
                      sm:text-2xl
                      md:text-3xl
                      lg:text-4xl
                      italic
                      leading-relaxed
                      text-gray-800
                    ">
                      {msg.message}
                    </p>

                    {/* Teacher name */}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px w-10 sm:w-14 bg-gray-800"></span>

                      <p className="
                        text-base
                        sm:text-lg
                        md:text-xl
                        font-medium
                        text-gray-800
                      ">
                        {msg.message_of.full_name}
                      </p>
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