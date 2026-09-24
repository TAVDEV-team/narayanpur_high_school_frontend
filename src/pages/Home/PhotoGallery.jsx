
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";

import API from "../../api/api";


export default function PhotoGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await API.get("/gallery/photos/");
        setImages(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="bg-[#f7f8fb] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        
{/* Header */}
<div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

  <div>
    {/* Eyebrow */}
    <div className="mb-3 flex items-center gap-2">
      <Camera className="h-4 w-4 text-[#855300]" />

      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#855300]">
        Campus Life
      </span>
    </div>

    {/* Main heading */}
    <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#00236f] sm:text-4xl lg:text-5xl">
      Moments from Our School
    </h2>

    {/* Description */}
    <p className="mt-3 max-w-xl text-sm leading-6 text-[#444651] sm:text-base">
      Explore memorable moments, school activities, and everyday life at
      Narayanpur High School.
    </p>
  </div>

  {/* View all */}
  <Link
    href="/gallery"
    className="group inline-flex w-fit items-center gap-2 border-b border-[#00236f] pb-1 text-sm font-bold text-[#00236f] transition hover:border-[#855300] hover:text-[#855300]"
  >
    View All Photos

    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>

</div>



        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {/* Gallery */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2">

            {/* Featured */}
            <Link
              href="/gallery"
              className="group relative min-h-[360px] overflow-hidden rounded-2xl md:col-span-7 md:row-span-2 md:min-h-[520px]"
            >
              <img
                src={images[0].image}
                alt={images[0].title || "Narayanpur High School"}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e7c47a]">
                  Featured
                </span>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Life at Narayanpur High School
                </h3>
              </div>
            </Link>

            {/* Smaller images */}
            {images.slice(1, 5).map((img, index) => (
              <Link
                key={index}
                href="/gallery"
                className="group relative min-h-[220px] overflow-hidden rounded-2xl md:col-span-5"
              >
                <img
                  src={img.image}
                  alt={img.title || "School gallery"}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[#00236f]/10 transition group-hover:bg-[#00236f]/30" />

                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-10">
                    <p className="text-sm font-semibold text-white">
                      {img.title}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && images.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Camera className="mx-auto h-8 w-8 text-slate-400" />

            <p className="mt-4 font-semibold text-[#00236f]">
              No gallery photos available.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
