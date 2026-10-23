"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { clinicConfig } from "@/config/clinic";

interface HeroProps {
  onContactClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onContactClick, onExploreClick }: HeroProps) {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-burgundy-700"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
                DR MEGERSA DENTAL CLINIC · ADAMA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-charcoal-900 leading-[1.15] mb-5 tracking-tight">
              A healthy smile starts with the right care.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed mb-8 max-w-xl font-normal">
              Looking for dental care? Learn about our services and contact our clinic to discuss what you need.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:ring-offset-2"
              >
                <span>Contact Our Clinic</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-charcoal-800 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded-md transition-colors"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Small Supporting Line */}
            <p className="text-xs sm:text-sm text-charcoal-500 italic">
              Your dental care starts with a conversation.
            </p>

            {/* Cultural phrases */}
            <div className="mt-8 pt-6 border-t border-sand-200 flex flex-wrap gap-x-6 gap-y-2 text-xs text-charcoal-600 font-medium">
              <div>
                <span className="text-burgundy-700 font-semibold mr-1.5">Afaan Oromo:</span>
                <span>{clinicConfig.brandPhrases.afaanOromo}</span>
              </div>
              <div className="text-sand-400 hidden sm:inline">•</div>
              <div>
                <span className="text-burgundy-700 font-semibold mr-1.5">Amharic:</span>
                <span>{clinicConfig.brandPhrases.amharic}</span>
              </div>
            </div>
          </div>

          {/* Real Doctor Image Composition */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Decorative Subtle Frame */}
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-sand-200 via-sand-100 to-cream-50 -z-10 border border-sand-300 shadow-card"></div>

              {/* Main Image Container */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-sand-200 border border-sand-300 shadow-card">
                <Image
                  src="/images/dr-megersa.jpg"
                  alt="Dr Megersa, Doctor of Dental Surgery in Adama"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-top hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Verified Professional Floating Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-cream-50/95 backdrop-blur-md p-3.5 rounded-lg border border-sand-300 shadow-subtle flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-charcoal-900">{clinicConfig.doctorName}</p>
                  <p className="text-[11px] text-charcoal-600">{clinicConfig.doctorTitle}</p>
                </div>
                <div className="h-7 w-7 rounded-full bg-burgundy-50 border border-burgundy-100 flex items-center justify-center text-burgundy-700">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
