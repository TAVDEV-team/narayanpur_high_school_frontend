import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
        console.log(res.data.results)
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-16">
    <CardHeader
    text="Teachers Message"
    />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop={true}
      >
        {messages.map((msg, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow-2xl p-8 md:p-12 hover:scale-105 transform transition duration-500">
              {/* Image */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={msg.message_of.image || "/default.png"}
                  alt={msg.message_of.full_name}
                  className="w-64 sm:w-80 md:w-96 h-auto rounded-xl shadow-lg object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="relative text-gray-900 px-2 sm:px-0">
                <svg
                  className="absolute -top-6 left-0 w-10 h-10 sm:w-12 sm:h-12 text-blue-200 opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5v14l7-7-7-7z"
                  />
                </svg>

                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-relaxed">
                  "{msg.message}"
                </p>
                <p className="mt-6 font-semibold text-lg sm:text-xl md:text-2xl">
                  {msg.message_of.full_name}
                </p>
                {/* <p className="mt-6 sm:text-xl md:text-2xl">
                  Teacher
                </p> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

