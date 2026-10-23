"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Camera } from "lucide-react";

export function GallerySection() {
  const photos = [
    {
      src: "/images/clinic-reception.jpg",
      alt: "Dr Megersa Dental Clinic reception and waiting lounge in Adama",
      title: "Clinic Reception & Welcome Lounge",
      caption: "An organized, clean, and welcoming environment for every visiting patient.",
      tag: "Reception Area",
    },
    {
      src: "/images/clinic-treatment.jpg",
      alt: "Dr Megersa providing dental care in the clinical examination chair",
      title: "Treatment & Clinical Care",
      caption: "Modern dental operatory equipped for diagnosis and attentive patient care.",
      tag: "Clinical Operatory",
    },
    {
      src: "/images/dr-megersa.jpg",
      alt: "Dr Megersa, Doctor of Dental Surgery",
      title: "Dr Megersa, DDS",
      caption: "Doctor of Dental Surgery, committed to personalized patient attention.",
      tag: "Doctor Profile",
    },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-mist-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-mint-200 shadow-subtle w-fit mb-3">
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
              INSIDE OUR PRACTICE
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
            A closer look at our clinic.
          </h2>
          <p className="text-base text-slate-600">
            Real photographs from Dr Megersa Dental Clinic in Adama, Ethiopia.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist-200">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 border border-white/80 shadow-subtle">
                  {item.tag}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
