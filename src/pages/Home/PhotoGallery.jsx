import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Import } from "lucide-react";
import API from "../../api/api";

export default function PhotoGallery() {
  const scrollRef = useRef(null);
  const [images, setImages] = useState([]);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await API.get(
          "/gallery/photos/"
        );
        console.log(res.data.results)
        // Assuming API returns an array of image objects with `url` field
        setImages(res.data.results); 
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      }
    };

    fetchImages();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const step = () => {
      if (!scrollContainer) return;
      scrollAmount += 1; // speed
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(step);
    };

    const animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [images]);

  return (
    <section className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Photo Gallery
        </h2>
        <Link
          to="/gallery"
          className="text-blue-950 font-semibold hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Auto-scroll gallery */}
      <div ref={scrollRef} className="flex space-x-4 overflow-x-hidden py-2">
        {[...images, ...images].map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-60 h-40 sm:w-72 sm:h-48 md:w-80 md:h-56 rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition border-4 border-gray-200"
          >

            <img
              src={img.image}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
