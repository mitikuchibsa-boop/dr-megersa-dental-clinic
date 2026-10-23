"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Building, Sparkles } from "lucide-react";

interface ClinicIntroProps {
  onContactClick: () => void;
}

export function ClinicIntro({ onContactClick }: ClinicIntroProps) {
  return (
    <section id="clinic" className="py-16 md:py-24 bg-mist-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Reception Image Composition */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden glass-panel border border-white/80 shadow-floating group">
              <Image
                src="/images/clinic-reception.jpg"
                alt="Dr Megersa Dental Clinic reception and waiting area in Adama"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/90 flex items-center justify-between text-xs font-medium text-slate-800">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Reception & Patient Lounge · Nafran Mall, Adama</span>
                </div>
                <span className="text-[11px] text-teal-700 font-semibold bg-mint-100 px-2 py-0.5 rounded">
                  Original Clinic Photo
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-mint-200 shadow-subtle w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                WELCOME TO OUR CLINIC
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
              Dental care you can feel comfortable with.
            </h2>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
              <p>
                Your teeth deserve proper care and attention. We want to help you understand your dental needs and find the right next step.
              </p>
              <p>
                Have a question or need dental care? Contact our clinic to learn more.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/80 border border-mist-200 text-sm text-slate-800 shadow-subtle">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Comfortable, clean environment</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/80 border border-mist-200 text-sm text-slate-800 shadow-subtle">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Direct patient consultation</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/80 border border-mist-200 text-sm text-slate-800 shadow-subtle">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Central location in Adama</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/80 border border-mist-200 text-sm text-slate-800 shadow-subtle">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Clear explanation of options</span>
              </div>
            </div>

            <div>
              <button
                onClick={onContactClick}
                className="btn-primary-glow inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-xl"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
