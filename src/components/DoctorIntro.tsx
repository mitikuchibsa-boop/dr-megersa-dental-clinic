"use client";

import React from "react";
import Image from "next/image";
import { clinicConfig } from "@/config/clinic";
import { ShieldCheck, UserCheck, Stethoscope, Sparkles } from "lucide-react";

interface DoctorIntroProps {
  onContactClick: () => void;
}

export function DoctorIntro({ onContactClick }: DoctorIntroProps) {
  return (
    <section id="doctor" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl border border-white/90 p-6 sm:p-10 md:p-12 shadow-floating relative overflow-hidden">
          
          {/* Subtle background gradient splash */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Dr Megersa Real Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-[4/5] w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden glass-card border border-white shadow-glass">
                <Image
                  src="/images/dr-megersa.jpg"
                  alt="Dr Megersa, Doctor of Dental Surgery"
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/90 text-center">
                  <p className="text-xs font-bold text-slate-900">{clinicConfig.doctorName}</p>
                  <p className="text-[11px] text-teal-700 font-medium">{clinicConfig.doctorTitle}</p>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-50/80 border border-cyan-200 shadow-subtle w-fit mb-4">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                  MEET YOUR DENTIST
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Care starts with understanding your needs.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Dr Megersa Dental Clinic welcomes you to learn more about our dental services and discuss your dental concerns with the clinic.
              </p>

              {/* Verified Professional Credentials Card */}
              <div className="bg-white/80 rounded-2xl p-5 border border-mist-200 shadow-subtle space-y-3 mb-8">
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-100 to-mint-100 border border-mint-300 flex items-center justify-center text-teal-700 shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{clinicConfig.doctorName}</p>
                    <p className="text-xs text-slate-600">{clinicConfig.doctorTitle}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-mist-200 flex items-center space-x-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Licensed professional dental surgery practice serving Adama and surrounding communities.</span>
                </div>
              </div>

              <div>
                <button
                  onClick={onContactClick}
                  className="btn-primary-glow inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-xl"
                >
                  Contact Our Clinic
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
