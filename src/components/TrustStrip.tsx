"use client";

import React from "react";
import { clinicConfig } from "@/config/clinic";
import { CheckCircle2, ShieldCheck, MapPin, Award } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="py-6 border-y border-mist-200 bg-gradient-to-r from-mist-50 via-white to-cyan-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Brand Phrases in Afaan Oromo & Amharic */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-800 font-medium">
            <div className="flex items-center space-x-2 bg-white/90 px-3.5 py-1.5 rounded-lg border border-mint-200 shadow-subtle">
              <span className="text-teal-700 font-bold uppercase tracking-wider text-[11px]">
                Afaan Oromo:
              </span>
              <span className="font-semibold text-slate-900">{clinicConfig.brandPhrases.afaanOromo}</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/90 px-3.5 py-1.5 rounded-lg border border-cyan-200 shadow-subtle">
              <span className="text-cyan-700 font-bold uppercase tracking-wider text-[11px]">
                Amharic:
              </span>
              <span className="font-semibold text-slate-900">{clinicConfig.brandPhrases.amharic}</span>
            </div>
          </div>

          {/* Key Assurance Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600 font-medium">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{clinicConfig.doctorTitle}</span>
            </div>
            <div className="hidden sm:inline text-slate-300">•</div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Adama, Ethiopia</span>
            </div>
            <div className="hidden sm:inline text-slate-300">•</div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Direct Doctor Consultation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
