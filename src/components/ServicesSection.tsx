"use client";

import React from "react";
import { clinicConfig, ServiceItem } from "@/config/clinic";
import { ArrowRight, HelpCircle } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-sand-100/50 border-t border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
              OUR SERVICES
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight mb-4">
            How can we help you?
          </h2>

          <p className="text-base text-charcoal-700">
            Choose a service to learn more or contact us with your questions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicConfig.services.map((service: ServiceItem, index: number) => (
            <div
              key={service.id}
              className="bg-cream-50 rounded-xl p-6 border border-sand-200 shadow-subtle hover:shadow-card hover:border-sand-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-charcoal-500 font-mono">
                    0{index + 1}
                  </span>
                  {!service.isVerifiedByClinic && (
                    <span className="inline-flex items-center text-[10px] text-charcoal-500 bg-sand-100 px-2 py-0.5 rounded border border-sand-200">
                      Inquiry Available
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-xl font-bold text-charcoal-900 mb-2.5 group-hover:text-burgundy-800 transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-sand-100">
                <button
                  type="button"
                  onClick={() => onSelectService(service.name)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-burgundy-700 hover:text-burgundy-800 group/btn py-2 px-1 focus:outline-none focus:underline"
                >
                  <span>Ask About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinic Verification Note */}
        <div className="mt-8 flex items-center space-x-2 text-xs text-charcoal-500 max-w-xl">
          <HelpCircle className="w-3.5 h-3.5 text-sand-400 shrink-0" />
          <span>
            Service availability and clinical treatment recommendations are confirmed following direct clinical consultation.
          </span>
        </div>

      </div>
    </section>
  );
}
