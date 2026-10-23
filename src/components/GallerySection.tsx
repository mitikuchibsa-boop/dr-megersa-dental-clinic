"use client";

import React from "react";
import Image from "next/image";

export function GallerySection() {
  const images = [
    {
      src: "/images/clinic-reception.jpg",
      alt: "Dr Megersa Dental Clinic reception and patient waiting area",
      title: "Clinic Reception & Waiting Lounge",
      caption: "A welcoming, clean, and organized space for all incoming patients.",
      aspect: "aspect-[4/3]",
    },
    {
      src: "/images/clinic-treatment.jpg",
      alt: "Dr Megersa treating a patient in the dental examination chair",
      title: "Treatment & Clinical Care",
      caption: "Modern dental operatory equipped for attentive patient diagnosis and care.",
      aspect: "aspect-[4/3]",
    },
    {
      src: "/images/dr-megersa.jpg",
      alt: "Dr Megersa, Doctor of Dental Surgery",
      title: "Dr Megersa",
      caption: "Doctor of Dental Surgery, dedicated to personalized patient attention.",
      aspect: "aspect-[4/3]",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-sand-100/40 border-t border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
              INSIDE OUR PRACTICE
            </span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight mb-3">
            A closer look at our clinic.
          </h2>
          <p className="text-base text-charcoal-600">
            Real photos from Dr Megersa Dental Clinic in Adama, Ethiopia.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {images.map((item, idx) => (
            <div
              key={idx}
              className="bg-cream-50 rounded-xl overflow-hidden border border-sand-200 shadow-subtle flex flex-col group hover:shadow-card transition-all"
            >
              <div className={`relative ${item.aspect} w-full overflow-hidden bg-sand-200`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-charcoal-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
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
