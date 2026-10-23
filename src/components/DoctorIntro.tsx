"use client";

import React from "react";
import Image from "next/image";
import { clinicConfig } from "@/config/clinic";
import { ShieldCheck, UserCheck } from "lucide-react";

interface DoctorIntroProps {
  onContactClick: () => void;
}

export function DoctorIntro({ onContactClick }: DoctorIntroProps) {
  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand-100 rounded-2xl border border-sand-200 p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Doctor Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-[4/5] w-full max-w-xs sm:max-w-sm rounded-xl overflow-hidden bg-sand-200 border border-sand-300 shadow-card">
                <Image
                  src="/images/dr-megersa.jpg"
                  alt="Dr Megersa, Doctor of Dental Surgery"
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Doctor Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700"></span>
                <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
                  MEET YOUR DENTIST
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight mb-4">
                Care starts with understanding your needs.
              </h2>

              <p className="text-base text-charcoal-700 leading-relaxed mb-6">
                Dr Megersa Dental Clinic welcomes you to learn more about our dental services and discuss your dental concerns with the clinic.
              </p>

              {/* Verified Credentials */}
              <div className="bg-cream-50 rounded-xl p-5 border border-sand-200 space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-burgundy-50 border border-burgundy-100 flex items-center justify-center text-burgundy-700 shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-900">{clinicConfig.doctorName}</p>
                    <p className="text-xs text-charcoal-600">{clinicConfig.doctorTitle}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-sand-200 flex items-center space-x-3 text-xs text-charcoal-600">
                  <ShieldCheck className="w-4 h-4 text-burgundy-700 shrink-0" />
                  <span>Licensed professional dental practice serving Adama and surrounding communities.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onContactClick}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:ring-offset-2"
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
