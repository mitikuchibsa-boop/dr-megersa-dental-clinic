"use client";

import React from "react";
import { MessageSquareText } from "lucide-react";

interface PatientExperienceProps {
  onContactClick: () => void;
}

export function PatientExperience({ onContactClick }: PatientExperienceProps) {
  return (
    <section className="py-14 md:py-20 bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-sand-100 rounded-2xl p-8 sm:p-12 border border-sand-200 shadow-subtle">
          
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy-100 text-burgundy-700 mb-5">
            <MessageSquareText className="w-6 h-6" />
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
            Not sure which service you need?
          </h2>

          <p className="text-base sm:text-lg text-charcoal-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Tell us what is bothering you. Contact our clinic and explain your concern. We can discuss the next step with you.
          </p>

          <button
            onClick={onContactClick}
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:ring-offset-2"
          >
            Ask About Your Dental Care
          </button>

        </div>
      </div>
    </section>
  );
}
