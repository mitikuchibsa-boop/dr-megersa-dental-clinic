"use client";

import React from "react";
import { clinicConfig, ServiceItem } from "@/config/clinic";
import { ArrowRight, HelpCircle, Sparkles, Smile, ShieldPlus, Activity, Sparkle, RefreshCw, Layers } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  // Service icon mapping
  const serviceIcons: Record<string, React.ReactNode> = {
    checkup: <Smile className="w-5 h-5 text-teal-600" />,
    cleaning: <Sparkle className="w-5 h-5 text-cyan-600" />,
    filling: <ShieldPlus className="w-5 h-5 text-teal-600" />,
    "root-canal": <Activity className="w-5 h-5 text-cyan-600" />,
    replacement: <Layers className="w-5 h-5 text-teal-600" />,
    alignment: <RefreshCw className="w-5 h-5 text-cyan-600" />,
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-mist-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-mint-200 shadow-subtle w-fit mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
              OUR SERVICES
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            How can we help you?
          </h2>

          <p className="text-base text-slate-600">
            Choose a service to learn more or contact us with your questions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicConfig.services.map((service: ServiceItem, index: number) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-50 to-mint-100 border border-mint-200 flex items-center justify-center shadow-subtle group-hover:scale-110 transition-transform">
                    {serviceIcons[service.id] || <Sparkles className="w-5 h-5 text-teal-600" />}
                  </div>

                  <span className="text-xs font-mono font-medium text-slate-400 bg-white/70 px-2 py-0.5 rounded border border-mist-200">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2.5 group-hover:text-teal-700 transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-mist-200/80">
                <button
                  type="button"
                  onClick={() => onSelectService(service.name)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-teal-700 group/btn py-2 px-1 focus:outline-none"
                >
                  <span>Ask About This Service</span>
                  <div className="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-teal-600 group-hover/btn:translate-x-1 group-hover/btn:bg-mint-100 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="mt-8 flex items-center space-x-2 text-xs text-slate-500 max-w-xl">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Service availability and clinical treatment recommendations are confirmed following direct clinical consultation.
          </span>
        </div>

      </div>
    </section>
  );
}
