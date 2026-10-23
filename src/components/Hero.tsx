"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, HeartPulse } from "lucide-react";
import { clinicConfig } from "@/config/clinic";

interface HeroProps {
  onContactClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onContactClick, onExploreClick }: HeroProps) {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden w-full max-w-full">
      {/* Fluid ambient decorative light orbs (clipped inside overflow-hidden) */}
      <div className="absolute top-10 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-200/30 rounded-full blur-3xl -z-10 animate-pulse-glow pointer-events-none"></div>
      <div className="absolute top-32 right-6 w-72 h-72 sm:w-96 sm:h-96 bg-mint-200/30 rounded-full blur-3xl -z-10 animate-float pointer-events-none"></div>

      {/* Ribbon curved SVG backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 200 C 300 100, 600 400, 1000 220 C 1200 140, 1350 280, 1440 250"
            stroke="url(#paint0_linear)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A8E6CF" stopOpacity="0.6" />
              <stop offset="0.5" stopColor="#E0F7FA" stopOpacity="0.8" />
              <stop offset="1" stopColor="#00BCD4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Hero Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-mint-300 shadow-subtle backdrop-blur-md w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 -ml-4"></span>
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-800">
                DR MEGERSA DENTAL CLINIC · ADAMA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] mb-5 tracking-tight">
              A healthy smile starts with the{" "}
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-slate-900 bg-clip-text text-transparent">
                right care.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
              Looking for dental care? Learn about our services and contact our clinic to discuss what you need in a modern, welcoming environment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <button
                onClick={onContactClick}
                className="btn-primary-glow inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-xl"
              >
                <span>Contact Our Clinic</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={onExploreClick}
                className="btn-secondary-mint inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Supporting Line */}
            <p className="text-xs sm:text-sm text-slate-500 italic flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Your dental care starts with a conversation.</span>
            </p>

          </div>

          {/* Sunlit Architectural Dental Clinic Hero Image Composition */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-mint-300/30 via-cyan-200/40 to-white/70 blur-xl -z-10"></div>

              {/* Glass Frame Container */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden glass-panel border border-white/80 shadow-floating">
                <Image
                  src="/images/hero-dental-clinic.jpg"
                  alt="Modern sunlit dental clinic interior at Dr Megersa Dental Clinic in Adama"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
                  className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Subtle light overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-white/10 pointer-events-none"></div>

                {/* Floating Bottom Glass Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/90 shadow-glass flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-mint-100 border border-mint-300 flex items-center justify-center text-teal-700 shrink-0">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{clinicConfig.doctorName}, DDS</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-600">Modern Care · Nafran Mall, Adama</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-1.5 text-[11px] font-semibold text-teal-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                    <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                    <span>Gentle Dental Care</span>
                  </div>
                </div>

                {/* Contained Top Right Tag */}
                <div className="absolute top-3 right-3 hidden sm:flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-mint-200 shadow-glass">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span className="text-[11px] font-semibold text-slate-800">Welcoming New Inquiries</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
