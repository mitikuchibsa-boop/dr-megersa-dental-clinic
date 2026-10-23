"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ClinicIntroProps {
  onContactClick: () => void;
}

export function ClinicIntro({ onContactClick }: ClinicIntroProps) {
  return (
    <section id="clinic" className="py-16 md:py-24 bg-sand-100/60 border-t border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Reception Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-sand-200 border border-sand-300 shadow-card">
              <Image
                src="/images/clinic-reception.jpg"
                alt="Dr Megersa Dental Clinic reception area in Adama"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                Reception & Welcome Area · Nafran Mall, Adama
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
                WELCOME TO OUR CLINIC
              </span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight mb-5">
              Dental care you can feel comfortable with.
            </h2>

            <div className="space-y-4 text-charcoal-700 text-base leading-relaxed mb-8">
              <p>
                Your teeth deserve proper care and attention. We want to help you understand your dental needs and find the right next step.
              </p>
              <p>
                Have a question or need dental care? Contact our clinic to learn more.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-charcoal-800">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>Comfortable & clean setting</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>Direct patient consultation</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>Convenient location in Adama</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>Clear explanation of options</span>
              </div>
            </div>

            <div>
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:ring-offset-2"
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
