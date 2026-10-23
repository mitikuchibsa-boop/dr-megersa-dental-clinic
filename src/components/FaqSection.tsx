"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      question: "Do I need to know which treatment I need?",
      answer: "No. You can contact the clinic and explain your concern.",
    },
    {
      id: "faq-2",
      question: "How can I contact the clinic?",
      answer: "You can call us or send an inquiry through WhatsApp if the selected number supports it.",
    },
    {
      id: "faq-3",
      question: "Where is the clinic?",
      answer: "Find Dr Megersa Dental Clinic in Adama using the map below. Please confirm the address before your visit.",
    },
    {
      id: "faq-4",
      question: "Can I ask about the cost of treatment?",
      answer: "Yes. Contact the clinic to ask about the cost of the service you need.",
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
              FREQUENTLY ASKED
            </span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight">
            Questions you may have.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-sand-100/70 border border-sand-200 rounded-xl overflow-hidden transition-all shadow-subtle"
              >
                <button
                  type="button"
                  id={`btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${faq.id}`}
                  onClick={() => toggleAccordion(faq.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAccordion(faq.id);
                    }
                  }}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 focus:outline-none focus:bg-sand-200/50 hover:bg-sand-100 transition-colors"
                >
                  <span className="font-editorial text-lg sm:text-xl font-bold text-charcoal-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full bg-cream-50 border border-sand-300 flex items-center justify-center text-charcoal-700 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-burgundy-700 border-burgundy-200" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`btn-${faq.id}`}
                  className="accordion-content"
                  data-open={isOpen}
                >
                  <div className="accordion-inner">
                    <div className="p-5 sm:p-6 pt-0 sm:pt-0 text-sm sm:text-base text-charcoal-700 leading-relaxed border-t border-sand-200/60 mt-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
