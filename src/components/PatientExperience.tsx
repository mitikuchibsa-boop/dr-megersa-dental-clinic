"use client";

import React from "react";
import { MessageSquareText, Sparkles, ArrowRight } from "lucide-react";

interface PatientExperienceProps {
  onContactClick: () => void;
}

export function PatientExperience({ onContactClick }: PatientExperienceProps) {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="glass-panel rounded-3xl p-8 sm:p-12 md:p-14 border border-white/90 shadow-floating relative">
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-100 via-mint-100 to-white border border-mint-300 text-teal-700 mb-6 shadow-subtle">
            <MessageSquareText className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Not sure which service you need?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Tell us what is bothering you. Contact our clinic and explain your concern. We can discuss the next step with you.
          </p>

          <button
            onClick={onContactClick}
            className="btn-primary-glow inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl"
          >
            <span>Ask About Your Dental Care</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

        </div>
      </div>
    </section>
  );
}
